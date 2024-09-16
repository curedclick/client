"use client";
import { Button, Fade, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";

export default function OnboardingPage() {
  const theme = useTheme();
  return (
    <Fade in timeout={300}>
      <Stack component="main" spacing={5} paddingTop={5}>
        <Fade in style={{ transitionDelay: "500ms" }}>
          <Typography component="h1" variant="h4" textAlign="center">
            Let&apos;s get you onboarded!
          </Typography>
        </Fade>
        <Fade in style={{ transitionDelay: "2000ms" }}>
          <Typography component="h1" variant="h4" textAlign="center">
            We&apos;ll need to grab a few details to get you setup.
          </Typography>
        </Fade>
        <Fade in style={{ transitionDelay: "4000ms" }}>
          <Typography component="h1" variant="h4" textAlign="center">
            Here at Kin
            <span style={{ color: theme.palette.secondary.main }}>Well</span> we
            value your health.
          </Typography>
        </Fade>
        <Fade in style={{ transitionDelay: "5000ms" }}>
          <Link href="/onboarding/details">
            <Button fullWidth variant="contained" sx={{ fontSize: 20 }}>
              Click here to transform your care experience!
            </Button>
          </Link>
        </Fade>
      </Stack>
    </Fade>
  );
}
