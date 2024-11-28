import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../redux/slices/userSlice";
import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function ProfileButtonGroup() {
  const dispatch = useDispatch();
  const {user, status} = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!user && status === "idle") {
      dispatch(getUser());
    }
  }, [dispatch, user, status]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
      {user ? (
        <Button
          component={NavLink}
          to={`/profile/${user.userName}`}
          sx={{
            display: "flex",
            alignItems: "center",
            textTransform: "none",
          }}
        >
          <Typography sx={{ color: "white" }}>{user.userName}</Typography>
        </Button>
      ) : (
        <>
          <Button
            component={NavLink}
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "#0e1420",
                color: "white",
              },
            }}
            to="/login"
          >
            Login
          </Button>
          <Button sx={{ color: "white" }}>Register</Button>
        </>
      )}
    </Box>
  );
}
