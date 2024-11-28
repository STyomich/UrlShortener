import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ProfileButtonGroup from "./ProfileButtonGroup";

export default function NavBar() {
  return (
    <Box sx={{ marginBottom: "70px" }}>
      <AppBar position="absolute" style={{ backgroundColor: "#0e1420" }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold", justifyContent: "center" }}
              >
                Url Shortener
              </Typography>
            </IconButton>
            <Button
              component={NavLink}
              to="/"
              variant="text"
              style={{ color: "white", fontWeight: "bold", marginLeft: "20px" }}
            >
              List
            </Button>
            <Button
              component={NavLink}
              to="/about"
              variant="text"
              style={{ color: "white", fontWeight: "bold", marginLeft: "20px" }}
            >
              About
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ProfileButtonGroup />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
