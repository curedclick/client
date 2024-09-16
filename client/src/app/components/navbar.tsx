/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import {
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { signOut } from "supertokens-auth-react/recipe/session";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const navItems = [
  { label: "Home", slug: "" },
  { label: "About", slug: "about-us" },
  { label: "Contact", slug: "contact-us" },
];

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const session = useSessionContext();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  async function onLogout() {
    await signOut();
    window.location.href = "/auth"; // or to wherever your logic page is
  }

  const theme = useTheme();
  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.appBar.main,
          padding: "10px 0",
          boxShadow: "none",
        }}
        component="nav"
      >
        <Container>
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
            disableGutters
          >
            <a href="/">
              <Box
                sx={{
                  maxWidth: 180,
                  width: "100%",
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 120,
                  },
                }}
              >
                <img
                  alt="KinWell Pharmacy Logo"
                  style={{ width: "100%" }}
                  src="https://i0.wp.com/kinwellpharmacy.co.uk/wp-content/uploads/2023/10/KinWell-Main-RGB-e1698790107312.png?w=1133&ssl=1"
                />
              </Box>
            </a>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  display: "none",
                  [theme.breakpoints.up("md")]: { display: "block" },
                }}
              >
                {navItems.map((item) => (
                  <Button
                    href={`https://kinwellpharmacy.co.uk/${item.slug}`}
                    key={item.label}
                    disableRipple
                    sx={{ fontSize: "16px" }}
                  >
                    {item.label}
                  </Button>
                ))}
                {session.loading === false && session.doesSessionExist ? (
                  <Button
                    onClick={onLogout}
                    disableRipple
                    sx={{ fontSize: "16px" }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Link href="/auth">
                    <Button
                      variant="contained"
                      disableRipple
                      sx={{ fontSize: "16px" }}
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </Box>
              <Box
                sx={{
                  display: "none",
                  [theme.breakpoints.down("md")]: { display: "block" },
                }}
              >
                <Button onClick={toggleDrawer(true)}>
                  <MenuRoundedIcon fontSize="large" />
                </Button>
                <Drawer
                  open={open}
                  onClose={toggleDrawer(false)}
                  anchor="right"
                >
                  <Box
                    sx={{ width: 250 }}
                    paddingTop={5}
                    paddingLeft={2}
                    paddingRight={2}
                    role="presentation"
                  >
                    <Box display="flex" justifyContent="flex-end">
                      <Stack alignItems="center">
                        <Button onClick={toggleDrawer(false)}>
                          <CloseRoundedIcon />
                        </Button>
                        {/* <SignedIn>
                          <UserButton />
                        </SignedIn> */}
                      </Stack>
                    </Box>
                    <List>
                      {navItems.map((item, key) => (
                        <ListItem
                          key={key}
                          onClick={toggleDrawer(false)}
                          sx={{ paddingTop: 2, paddingBottom: 2 }}
                        >
                          <Link
                            href={`https://kinwellpharmacy.co.uk/${item.slug}`}
                          >
                            {item.label}
                          </Link>
                        </ListItem>
                      ))}
                      {/* <SignedIn>
                        <ListItem onClick={toggleDrawer(false)}>
                          <SignOutButton>
                            <Button fullWidth variant="contained">
                              Sign Out
                            </Button>
                          </SignOutButton>
                        </ListItem>
                      </SignedIn>
                      <SignedOut>
                        <ListItem onClick={toggleDrawer(false)}>
                          <SignInButton>
                            <Button fullWidth variant="contained">
                              Sign In
                            </Button>
                          </SignInButton>
                        </ListItem>
                        <ListItem onClick={toggleDrawer(false)}>
                          <SignUpButton>
                            <Button fullWidth variant="outlined">
                              Sign Up
                            </Button>
                          </SignUpButton>
                        </ListItem>
                      </SignedOut> */}
                    </List>
                  </Box>
                </Drawer>
              </Box>
              <Box sx={{ [theme.breakpoints.down("md")]: { display: "none" } }}>
                {/* <SignedIn>
                  <UserButton />
                </SignedIn> */}
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
