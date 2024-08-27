"use client";
import {
  Fade,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { steps } from "../contact/ContactForm";

export default function SuccessPage() {
  // Fetch GP surgeries on the server side

  return (
    <Fade in>
      <Grid container marginTop={5} spacing={2}>
        <Grid item xs={12}>
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign="center" component="h1" variant="h4">
            Success!
          </Typography>
        </Grid>
      </Grid>
    </Fade>
  );
}
