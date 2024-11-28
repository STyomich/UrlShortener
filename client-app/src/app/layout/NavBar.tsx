import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileButtonGroup from "./ProfileButtonGroup";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function NavBar() {
  const { user } = useSelector((state: unknown) => state.user);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    if (user) navigate("/create-short-url");
    else toast.error("Not authorized");
  };
  return (
    <Box sx={{ marginBottom: "70px" }}>
      <ToastContainer />
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
              onClick={() => handleCreateClick()}
              variant="text"
              style={{ color: "white", fontWeight: "bold", marginLeft: "20px" }}
            >
              Create
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
