import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Button,
  Typography,
  Paper,
  TextField,
  Chip,
  Stack,
  Card,
} from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  editMovie,
  editMovieId,
  editMovieUI,
} from "../../appReducer/movieSlice";

const EditMovieComp = (props) => {
  const [movie, setMovie] = useState({
    name: "",
    premieredYear: 0,
    genres: [],
    image: "",
  });
  const [newGenre, setNewGenre] = useState("");

  useEffect(() => {
    setMovie(props.movie);
  }, []);

  const dispatch = useDispatch();

  const addGenre = () => {
    setMovie({ ...movie, genres: [...movie.genres, newGenre] });
    setNewGenre("");
  };

  const deleteGenre = (genre) => {
    setMovie({
      ...movie,
      genres: [...movie.genres.filter((gen) => gen !== genre)],
    });
  };

  const saveChanges = () => {
    dispatch(editMovie(movie));
    dispatch(editMovieUI(movie));
    dispatch(editMovieId(""));
  };

  return (
    <Card sx={{ width: "350px", height: "510px", p: 2 }}>
      <br />
      <Typography variant="h6" align="center">
        Edit movie
      </Typography>
      <FormControl
        sx={{ width: "25ch", mt: 2, mb: 1 }}
        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
      >
        <TextField
          id="standard-basic"
          label="Movie name"
          variant="standard"
          value={movie.name}
          focused
        />
      </FormControl>

      <FormControl
        sx={{ width: "25ch", mb: 1 }}
        onChange={(e) => setMovie({ ...movie, premieredYear: e.target.value })}
      >
        <TextField
          id="standard-basic"
          label="Year premiered"
          variant="standard"
          value={movie.premieredYear}
          focused
        />
      </FormControl>

      <FormControl
        sx={{ width: "25ch", mb: 2 }}
        onChange={(e) => setMovie({ ...movie, image: e.target.value })}
      >
        <TextField
          id="standard-basic"
          label="Image URL"
          variant="standard"
          value={movie.image}
          focused
        />
      </FormControl>

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
        <Button variant="outlined" sx={{ width: "7ch" }} onClick={addGenre}>
          Add
        </Button>
      </FormControl>
      <Box sx={{ display: "flex" }}>
        <Box
          className="buttons"
          sx={{
            flexDirection: "row",
            width: "50%",
            backgroundColor: "balck",
            mt: 2.5,
          }}
        >
          <Stack direction="row" spacing={1}>
            {movie.genres.map((genre, index) => {
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
          <Button
            size="small"
            variant="contained"
            onClick={saveChanges}
            sx={{ mt: 6 }}
          >
            Save Changes
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => dispatch(editMovieId(""))}
          >
            Cancel
          </Button>
        </Box>
        <Box sx={{ ml: 6, mt: 3 }}>
          <img src={movie.image} style={{ width: "110px" }} />
        </Box>
        <br />
      </Box>
    </Card>
  );
};

export default EditMovieComp;
