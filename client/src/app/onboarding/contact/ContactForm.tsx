"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Fade,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAddressFromPostcode } from "@/app/api/routes/os-places/os-places.query";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid2";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { getUserInfo } from "@/app/api/routes/onboarding/onboarding.query";

export type GpSurgery = {
  id: number;
  gpPracticeName: string;
  addressLine4: string;
  addressLine3: string;
};

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

export default function ContactForm() {
  const session = useSessionContext();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      postcode: "",
      fullAddress: "",
      email:
        !session.loading && session.doesSessionExist
          ? session.accessTokenPayload.email
          : "",
    },
  });

  const [addressOptions, setAddressOptions] = useState<AddressData[]>([]);
  const [isAddressDisabled, setIsAddressDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchAddressOptions = async (postcode: string) => {
    try {
      setLoading(true);
      const data = await getAddressFromPostcode({ postcode });
      setAddressOptions(data.results || []);
      setLoading(false);
      setIsAddressDisabled(false); // Enable the address dropdown
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      setAddressOptions([]);
      setIsAddressDisabled(true); // Disable if the fetch fails
    }
  };

  const onSubmit = (data: any) => {
    sessionStorage.setItem("formPage2", JSON.stringify(data));

    router.push("/onboarding/success");
  };

  return (
    <Fade in timeout={300}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container marginTop={5} spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid size={{ lg: 4, md: 3, xs: 6 }}>
            <TextField
              variant="outlined"
              fullWidth
              label="Postcode"
              {...register("postcode", {
                required: true,
                pattern: {
                  value:
                    /^\s*(([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2}))\s*$/,
                  message: "Please provide a valid UK postcode",
                },
              })}
              required
              slotProps={{
                htmlInput: { style: { textTransform: "uppercase" } },
              }}
              error={!!errors.postcode}
              helperText={
                errors.postcode?.message
                  ? errors.postcode.message
                  : 'Enter your postcode then click "Search Address"'
              }
            />
          </Grid>
          <Grid size={{ lg: 2, md: 3, xs: 6 }}>
            <LoadingButton
              onClick={async (e) =>
                await fetchAddressOptions(getValues().postcode.trim())
              }
              fullWidth
              loading={loading}
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{ paddingTop: "15px", paddingBottom: "15px" }}
            >
              Search Address
            </LoadingButton>
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <FormControl fullWidth sx={{ height: "100%" }}>
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
                    value={JSON.stringify(address.DPA)}
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
          <Grid size={{ md: 6, xs: 12 }}>
            <TextField
              variant="outlined"
              type="tel"
              fullWidth
              label="Phone Number"
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value:
                    /^(?:\+44|44|0)\s?(?:7\d{3}\s?\d{6}|1\d{3}\s?\d{5,6}|2\d{3}\s?\d{5,6}|3\d{3}\s?\d{5,6}|\d{4}\s?\d{6})$/,
                  message: "Please provide a valid UK number",
                },
              })}
              error={!!errors?.phoneNumber}
              helperText={errors?.phoneNumber?.message?.toString()}
              required
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <TextField
              variant="outlined"
              disabled
              type="email"
              fullWidth
              label="Email"
              {...register("email", { required: true })}
              required
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
                Finish up!
              </Button>
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <Link href="/onboarding/details">
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
