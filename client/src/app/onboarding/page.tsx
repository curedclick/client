"use client";
import {
  Box,
  Button,
  colors,
  Fade,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";

export default function OnboardingPage() {
  const theme = useTheme();
  return (
    <Fade in>
      <Stack component="main" spacing={5} paddingTop={5}>
        <Typography component="h1" variant="h4" textAlign="center">
          Let's get you onboarded! Here at Kin
          <span style={{ color: theme.palette.secondary.main }}>Well</span> we
          value your health.
        </Typography>
        <Link href="/onboarding/details">
          <Button fullWidth variant="contained">
            Click here to transform your care experience!
          </Button>
        </Link>
      </Stack>
    </Fade>
  );
}
