import MovieComp from "./Movie";
import { useSelector } from "react-redux";
import { selectAllMovies } from "../../appReducer/movieSlice";
import Grid from "@mui/material/Unstable_Grid2";
import EditMovieComp from "./EditMovie";
import { Box } from "@mui/material";
import MoviesNavbarComp from "./MoviesNavbar";

function AllMoviesComp() {
  const searchTerms = useSelector((state) => state.movies.movieToSearch);
  const movies = useSelector(selectAllMovies);
  const editMovieId = useSelector((state) => state.movies.editMovieId);

  return (
    <Box>
      <br />
      <MoviesNavbarComp />
      <Grid
        container
        columnSpacing={6}
        rowSpacing={6}
        sx={{ maxWidth: "90%", mx: "auto" }}
      >
        {movies
          .filter((movie) => {
            if (searchTerms == "" || searchTerms == undefined) {
              return movie;
            } else if (movie.name.toLowerCase().includes(searchTerms)) {
              return movie;
            }
          })
          .map((movie) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={movie._id}>
                {editMovieId === movie._id && <EditMovieComp movie={movie} />}
                {editMovieId !== movie._id && <MovieComp movie={movie} />}
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

export default AllMoviesComp;
