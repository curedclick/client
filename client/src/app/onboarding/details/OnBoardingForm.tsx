"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Autocomplete,
  Stack,
  Button,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Typography,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { filterOptions } from "./helpers/filterOptions";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, parse } from "date-fns";
import Grid from "@mui/material/Grid2";
import { getUserInfo } from "@/app/api/routes/onboarding/onboarding.query";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

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

export interface AddressData {
  DPA: {
    UPRN: string;
    UDPRN: string;
    ADDRESS: string;
    BUILDING_NUMBER: string;
    THOROUGHFARE_NAME: string;
    POST_TOWN: string;
    POSTCODE: string;
    RPC: string;
    X_COORDINATE: number;
    Y_COORDINATE: number;
    STATUS: string;
    LOGICAL_STATUS_CODE: string;
    CLASSIFICATION_CODE: string;
    CLASSIFICATION_CODE_DESCRIPTION: string;
    LOCAL_CUSTODIAN_CODE: 9051;
    LOCAL_CUSTODIAN_CODE_DESCRIPTION: string;
    COUNTRY_CODE: string;
    COUNTRY_CODE_DESCRIPTION: string;
    POSTAL_ADDRESS_CODE: string;
    POSTAL_ADDRESS_CODE_DESCRIPTION: string;
    BLPU_STATE_CODE: string;
    BLPU_STATE_CODE_DESCRIPTION: string;
    TOPOGRAPHY_LAYER_TOID: string;
    WARD_CODE: string;
    LAST_UPDATE_DATE: string;
    ENTRY_DATE: string;
    BLPU_STATE_DATE: string;
    LANGUAGE: string;
    MATCH: number;
    MATCH_DESCRIPTION: string;
    DELIVERY_POINT_SUFFIX: string;
  };
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
  });
  const [addressOptions, setAddressOptions] = useState<AddressData[]>([]);
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

  const session = useSessionContext();

  !session.loading && session.doesSessionExist
    ? console.log(session.accessTokenPayload)
    : null;

  const onSubmit = (data: any) => {
    if (data.dateOfBirth) {
      data.dateOfBirth = format(new Date(data.dateOfBirth), "dd/MM/yyyy");
    }
    sessionStorage.setItem("formPage1", JSON.stringify(data));
    router.push("/onboarding/contact");
  };

  return (
    <Fade in timeout={300}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container marginTop={5} spacing={2} marginBottom={5}>
          <Grid size={{ xs: 12 }}>
            <Stepper activeStep={0} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid size={{ md: 6, xs: 6 }}>
            <TextField
              variant="outlined"
              fullWidth
              label="First Name"
              {...register("firstName", { required: true })}
              required
            />
          </Grid>
          <Grid size={{ md: 6, xs: 6 }}>
            <TextField
              variant="outlined"
              fullWidth
              label="Last Name"
              {...register("lastName", { required: true })}
              required
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
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
                  slotProps={{ input: { endAdornment: <CalendarTodayIcon /> } }}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
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
          <Grid size={{ md: 6, xs: 12 }}></Grid>
          <Grid
            container
            size={{ xs: 12 }}
            spacing={2}
            direction={{ xs: "row-reverse" }}
          >
            <Grid size={{ md: 6, xs: 12 }}>
              <Button type="submit" fullWidth variant="contained">
                Next
              </Button>
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
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
