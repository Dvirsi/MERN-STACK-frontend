import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  Button,
  Menu,
  Fade,
} from "@mui/material";
import {
  editMovieId,
  fetchMovies,
  searchMovie,
  selectFetchError,
} from "../appReducer/movieSlice";
import { fetchMembers, searchMember } from "../appReducer/memberSlice";
import { fetchSubs } from "../appReducer/subscriptionsSlice";
import { authenticateError, logout } from "../appReducer/userSlice";

function MainComp() {
  useEffect(() => {
    if (sessionStorage["username"] !== "") {
      dispatch(fetchMovies());
      dispatch(fetchMembers());
      dispatch(fetchSubs());
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const fetchError = useSelector(selectFetchError);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = sessionStorage["username"];

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    // Disconnects the user if not authenticated
    if (!username) {
      dispatch(authenticateError(""));
      logoutUser();
    }
  }, [username]);

  const toSubscriptionsComp = () => {
    dispatch(searchMember(""));
    dispatch(editMovieId(""));
    navigate("/subscriptions");
  };

  const toMoviesComp = () => {
    dispatch(searchMovie(""));
    dispatch(editMovieId(""));
    navigate("/");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ background: "rgba(23, 136, 185, 0.8)", boxShadow: "none" }}
        >
          <Toolbar>
            <MenuItem onClick={toMoviesComp}>
              <Typography textAlign="center">Movies</Typography>
            </MenuItem>
            <MenuItem onClick={toSubscriptionsComp}>
              <Typography textAlign="center">Subscriptions</Typography>
            </MenuItem>
            <MenuItem
              sx={{
                position: "absolute; right:0; top:5;",
                mr: 4,
                width: "100px",
              }}
            >
              <Button
                variant="outlined"
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <span style={{ color: "white" }}>{username}</span>
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </Menu>
            </MenuItem>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          backgroundColor: "rgba(150, 195, 235, 0.12)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}

export default MainComp;
