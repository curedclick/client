import { SignIn } from "@clerk/nextjs";
import styles from "./page.module.css";
import { Box, Container, Stack } from "@mui/material";

export default function Page() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} alignItems="center" className={styles.font}>
          <SignIn />
        </Stack>
      </Box>
    </Container>
  );
}
