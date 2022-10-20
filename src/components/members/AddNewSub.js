import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubscription,
  selectAllSubs,
} from "../../appReducer/subscriptionsSlice";
import { selectAllMovies } from "../../appReducer/movieSlice";
import { TextField, Stack, Autocomplete, Box, Button } from "@mui/material";

const SubNewMovieComp = (props) => {
  const dispatch = useDispatch();

  const movies = useSelector(selectAllMovies);

  const [newSub, setNewSub] = useState({
    movieId: "",
    memberId: "",
    date: Date(),
  });
  const [watchedMoviesIds, setWatchedMoviesIds] = useState([]);

  useEffect(() => {
    setNewSub({ ...newSub, memberId: props.memberId });
  }, [props.memberId]);

  const memberSubs = useSelector(selectAllSubs).filter(
    (sub) => sub.memberId?._id == newSub.memberId
  );

  useEffect(() => {
    setWatchedMoviesIds([...memberSubs.map((sub) => sub.movieId._id)]);
  }, [newSub.memberId]);

  const subscribeToNewMovie = () => {
    setWatchedMoviesIds([...watchedMoviesIds, newSub.movieId]);
    dispatch(addSubscription(newSub));
    props.closeSubNewMovie();
  };

  // Filter the movie that already watched
  const filterOptions = movies.filter(
    (movie) => !watchedMoviesIds.includes(movie._id)
  );

  return (
    <div>
      <div>
        <h4>Add a new movie</h4>
        <Box sx={{ minWidth: 120 }}>
          <Stack spacing={2} width="250px">
            <Autocomplete
              options={filterOptions}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Movies"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              onChange={(event, newValue) =>
                setNewSub({ ...newSub, movieId: newValue._id })
              }
            />
          </Stack>
          <Stack noValidate spacing={3}>
            <TextField
              id="date"
              label="Date"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setNewSub({ ...newSub, date: e.target.value })}
            />
          </Stack>
          <Button onClick={subscribeToNewMovie}>Subscribe</Button>
        </Box>
      </div>
    </div>
  );
};

export default SubNewMovieComp;
