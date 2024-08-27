"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Stack,
  Button,
  Stepper,
  Step,
  StepLabel,
  Fade,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export type GpSurgery = {
  id: number;
  gpPracticeName: string;
  addressLine4: string;
  addressLine3: string;
};

export const steps = ["My Details", "Contact Information"];

export default function ContactForm() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.emailAddresses[0].emailAddress || "",
    },
  });

  const router = useRouter();

  const onSubmit = (data: any) => {
    sessionStorage.setItem("formPage2", JSON.stringify(data));

    router.push("/onboarding/success");
  };

  return (
    <Fade in>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container marginTop={5} spacing={2}>
          <Grid item xs={12}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item md={6} xs={12}>
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
          <Grid item md={6} xs={12}>
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
                Finish up!
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
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
