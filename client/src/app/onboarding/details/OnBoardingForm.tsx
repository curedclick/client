"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  Autocomplete,
  Stack,
  Button,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Typography,
  FormControl,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { filterOptions } from "./helpers/filterOptions";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, parse } from "date-fns";
import { getAddressFromPostcode } from "@/app/api/routes/os-places/os-places.query";

export type GpSurgery = {
  id: number;
  gpPracticeName: string;
  addressLine4: string;
  addressLine3: string;
};

export interface OnboardingFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: any;
  gpSurgery: GpSurgery | undefined;
  postcode: string;
  fullAddress: string | undefined;
}

export const steps = ["My Details", "Contact Information"];

export default function OnboardingForm({
  gpSurgeries,
}: {
  gpSurgeries: Array<GpSurgery>;
}) {
  const router = useRouter();
  const [selectedGp, setSelectedGp] = useState<GpSurgery | null>(null);
  const [storedData, setStoredData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gpSurgery: undefined,
    postcode: "",
    fullAddress: undefined,
  });
  const [addressOptions, setAddressOptions] = useState<string[]>([]);
  const [isAddressDisabled, setIsAddressDisabled] = useState(true);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("formPage1") || "{}");

    if (data.dateOfBirth) {
      data.dateOfBirth = parse(data.dateOfBirth, "dd/MM/yyyy", new Date());
    }

    setStoredData({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      dateOfBirth: data.dateOfBirth || null,
      gpSurgery: data.gpSurgery || undefined,
      postcode: data.postcode || "",
      fullAddress: data.fullAddress || undefined,
    });

    if (data.gpSurgery) {
      const matchedGp = gpSurgeries.find((gp) => gp.id === data.gpSurgery.id);
      setSelectedGp(matchedGp || null);
    }
  }, [gpSurgeries]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    defaultValues: storedData,
  });

  useEffect(() => {
    // Reset the form with the stored data once it is loaded
    reset(storedData);
  }, [storedData, reset]);

  const fetchAddressOptions = async (postcode: string) => {
    try {
      const data = await getAddressFromPostcode({ postcode });
      setAddressOptions(data.results || []);
      setIsAddressDisabled(false); // Enable the address dropdown
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      setAddressOptions([]);
      setIsAddressDisabled(true); // Disable if the fetch fails
    }
  };

  const onSubmit = (data: any) => {
    if (data.dateOfBirth) {
      data.dateOfBirth = format(new Date(data.dateOfBirth), "dd/MM/yyyy");
    }
    sessionStorage.setItem("formPage1", JSON.stringify(data));
    router.push("/onboarding/contact");
  };

  return (
    <Fade in>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container marginTop={5} spacing={2} marginBottom={5}>
          <Grid item xs={12}>
            <Stepper activeStep={0} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="First Name"
              {...register("firstName", { required: true })}
              required
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Last Name"
              {...register("lastName", { required: true })}
              required
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              name="dateOfBirth"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DateField
                  fullWidth
                  label="Date of Birth"
                  clearable
                  required
                  format="dd/MM/yyyy"
                  InputProps={{
                    endAdornment: <CalendarTodayIcon />,
                  }}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              name="gpSurgery"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  fullWidth
                  autoHighlight
                  options={gpSurgeries}
                  filterOptions={filterOptions}
                  getOptionLabel={({ gpPracticeName }) => gpPracticeName}
                  value={selectedGp} // Ensure value is always controlled
                  onChange={(_, newValue) => {
                    setSelectedGp(newValue);
                    field.onChange(newValue);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value?.id
                  }
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Enter GP Surgery Here"
                      required
                    />
                  )}
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Stack key={option.id} component="li" {...optionProps}>
                        <Typography>{option.gpPracticeName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {option.addressLine4
                            ? option.addressLine4
                            : option.addressLine3}
                        </Typography>
                      </Stack>
                    );
                  }}
                />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Post Code"
              {...register("postcode", {
                required: true,
                pattern: {
                  value:
                    /^\s*(([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2}))\s*$/,
                  message: "Please provide a valid UK postcode",
                },
                onBlur: async (e) => {
                  const isValid = await trigger("postcode");
                  if (isValid) {
                    await fetchAddressOptions(e.target.value);
                  }
                },
              })}
              required
              error={!!errors.postcode}
              helperText={errors.postcode?.message}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="address-label">Select your address *</InputLabel>
              <Select
                fullWidth
                disabled={isAddressDisabled}
                labelId="address-label"
                label="Select your address *"
                required
                {...register("fullAddress", { required: true })}
                sx={{ backgroundColor: "white", whiteSpace: "normal" }}
                error={!!errors.fullAddress}
              >
                {addressOptions.map((address, index) => (
                  <MenuItem
                    key={index}
                    value={address?.DPA}
                    sx={{ whiteSpace: "normal" }}
                  >
                    {address?.DPA?.ADDRESS}
                  </MenuItem>
                ))}
              </Select>
              {errors.fullAddress ? (
                <FormHelperText>
                  <Typography color="error">
                    Please select an address
                  </Typography>
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}></Grid>
          <Grid
            item
            container
            xs={12}
            spacing={2}
            direction={{ xs: "row-reverse" }}
          >
            <Grid item md={6} xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Next
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Link href="/onboarding">
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "white" }}
                >
                  Previous
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Fade>
  );
}
