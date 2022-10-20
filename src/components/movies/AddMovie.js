import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Box,
  TextField,
  Paper,
  Chip,
  Typography,
  Stack,
} from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { addNewMovie, selectAddMovieError } from "../../appReducer/movieSlice";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const AddMovieComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newMovie, setNewMovie] = useState({
    name: "",
    premieredYear: dayjs("2022-30-02"),
    genres: [],
    image: "",
  });
  const [newGenre, setNewGenre] = useState("");
  const [showError, setShowError] = useState(false);

  const addMovieError = useSelector(selectAddMovieError);

  useEffect(() => {
    if (addMovieError == "") {
      navigate("/");
    }
  }, [addMovieError]);

  const addMovie = () => {
    dispatch(addNewMovie(newMovie))
      .unwrap()
      .catch(() => setShowError(true));
  };

  const addGenre = () => {
    setNewMovie({ ...newMovie, genres: [...newMovie.genres, newGenre] });
    setNewGenre("");
  };

  const deleteGenre = (genre) => {
    setNewMovie({
      ...newMovie,
      genres: [...newMovie.genres.filter((gen) => gen !== genre)],
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        mt: 3,
        justifyContent: "center",
        flexWrap: "wrap",
        "& > :not(style)": { m: 1, width: 600 },
      }}
    >
      <Paper
        elevation={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ alignSelf: "center", mt: 1 }}
        >
          Add Movie
        </Typography>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <Box className="addMovieForm" sx={{ ml: 2, width: "50%" }}>
            {showError && <p style={{ color: "red" }}>{addMovieError}</p>}
            <FormControl
              sx={{ width: "25ch" }}
              onChange={(e) =>
                setNewMovie({ ...newMovie, name: e.target.value })
              }
            >
              <TextField
                id="standard-basic"
                label="Movie name"
                variant="standard"
              />
            </FormControl>
            <br />
            <br />
            <br />
            <FormControl sx={{ width: "25ch" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  label="Year premiered"
                  value={newMovie.premieredYear || null}
                  maxDate={dayjs("2022-02-02")}
                  onChange={(newyear) => {
                    setNewMovie({ ...newMovie, premieredYear: newyear });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
            <br />
            <br />
            <FormControl
              sx={{ width: "25ch" }}
              onChange={(e) =>
                setNewMovie({ ...newMovie, image: e.target.value })
              }
            >
              <TextField
                id="standard-basic"
                label="Image URL"
                variant="standard"
              />
            </FormControl>
            <br />
            <br />
            <FormControl
              sx={{ width: "25ch", flexDirection: "row" }}
              onChange={(e) => setNewGenre(e.target.value)}
            >
              <TextField
                id="standard-basic"
                label="Genre"
                variant="standard"
                value={newGenre}
              />
              <Button
                variant="outlined"
                sx={{ width: "7ch" }}
                onClick={addGenre}
              >
                Add
              </Button>
            </FormControl>
            <br />
          </Box>
          <Box sx={{ width: "50%", mt: 1 }}>
            {newMovie.image.length > 0 && (
              <img
                src={newMovie.image}
                alt={newMovie.name + " picture"}
                style={{ height: "200px", width: "200px" }}
              />
            )}{" "}
            <br />
            <br />
            <Box className="showDetails" style={{ width: "50%" }}>
              <Stack direction="row" spacing={1}>
                {newMovie.genres?.map((genre, index) => {
                  return (
                    <Chip
                      key={index}
                      label={genre}
                      onDelete={() => deleteGenre(genre)}
                      deleteIcon={<DeleteIcon />}
                      variant="outlined"
                    />
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Box>
        <br />
        <br />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            m: 2,
          }}
        >
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button onClick={addMovie} variant="contained" sx={{ ml: 2 }}>
            Add New Movie
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddMovieComp;
