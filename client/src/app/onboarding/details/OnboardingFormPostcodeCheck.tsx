"use client";
import React, { useEffect } from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  Autocomplete,
  Box,
  Stack,
  Select,
  Button,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { filterOptions } from "./helpers/filterOptions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export type GpSurgery = {
  id: number;
  gpPracticeName: string;
  addressLine4: string;
  addressLine3: string;
};

export default function OnboardingFormPostcodeCheck({
  gpSurgeries,
}: {
  gpSurgeries: Array<GpSurgery>;
}) {
  const theme = useTheme();
  const [selectedGp, setSelectedGp] = React.useState<GpSurgery | null>(null);

  useEffect(() => {});

  return (
    <Grid
      container
      marginTop={5}
      spacing={2}
      sx={{
        [theme.breakpoints.up("md")]: {
          paddingLeft: 20,
          paddingRight: 20,
        },
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4">
          Let's check your eligibility for this service
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          label="Post Code"
          required
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained">
          <Typography paddingTop={1} paddingBottom={1}>
            Check
          </Typography>
          <ArrowForwardIcon />
        </Button>
      </Grid>
      <Grid item xs={12} display="none">
        <Select
          label="Select an address"
          fullWidth
          sx={{ backgroundColor: "white" }}
        ></Select>
      </Grid>
    </Grid>
  );
}
