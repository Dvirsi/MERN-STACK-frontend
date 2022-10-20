import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  ListItemButton,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectAllSubs } from "../../appReducer/subscriptionsSlice";
import { searchMovie } from "../../appReducer/movieSlice";

const WatchedMoviesComp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    setMemberId(props.memberId);
  }, [props.memberId]);

  const subs = useSelector(selectAllSubs).filter(
    (sub) => sub.memberId?._id === memberId
  );

  const showMovieDetails = (movieName) => {
    dispatch(searchMovie(movieName));
    navigate("/");
  };

  return (
    <Box
      sx={{
        scrollBehavior: "smooth",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ alignSelf: "center" }}>
        Movies Watched
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0.2 },
        }}
      >
        <ul>
          {subs.map((sub) => {
            return (
              <ListItem key={sub._id}>
                <ListItemButton
                  onClick={() => showMovieDetails(sub.movieId?.name)}
                >
                  <ListItemText primary={sub.movieId.name} />
                  {sub.date.slice(0, 10)}
                </ListItemButton>
              </ListItem>
            );
          })}
          <br /><br /> <br /> <br />
        </ul>
      </List>
    </Box>
  );
};

export default WatchedMoviesComp;
