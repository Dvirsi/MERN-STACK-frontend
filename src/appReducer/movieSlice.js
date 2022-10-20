import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieUtils from "../services/moviesService";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const { data } = await movieUtils.getAllMovies();
    return [...data];
  } catch (err) {
    throw Error(err.response.data.message);
  }
});

export const addNewMovie = createAsyncThunk(
  "movies/addNewMovie",
  async (newMovie) => {
    try {
      const { data } = await movieUtils.addMovie(newMovie);
      return data;
    } catch (err) {
      throw Error(err.response.data);
    }
  }
);

export const deletMovie = createAsyncThunk("movies/deletMovie", async (id) => {
  try {
    await movieUtils.deleteMovie(id);
    return id;
  } catch (err) {
    throw Error(err.response.data);
  }
});

export const editMovie = createAsyncThunk("movies/editMovie", async (obj) => {
  try {
    await movieUtils.updateMovie(obj._id, obj);
    return obj;
  } catch (err) {
    throw Error(err);
  }
});

const initialState = {
  movies: [],
  movieToSearch: "",
  editMovieId: "",
  moviesStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  fetchMovieError: null,
  addMovieError: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMovie: (state, action) => {
      state.movieToSearch = action.payload.toLowerCase();
    },

    editMovieId: (state, action) => {
      state.editMovieId = action.payload;
    },

    editMovieUI: (state, action) => {
      let stateToUpdate = [...state.movies];
      let index = stateToUpdate.findIndex((x) => x._id == action.payload._id);
      if (index > -1) {
        stateToUpdate[index] = action.payload;
      }
      state.movies = stateToUpdate;
    },

    addMovieFieldRequiered: (state, action) => {
      state.addMovieError = "All fields are required";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.moviesStatus = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.moviesStatus = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.moviesStatus = "failed";
        sessionStorage["username"] = "";
        if (action.error.response.data) {
          console.log(action.error);
          state.fetchMovieError = action.error.response.data;
        } else {
          state.fetchMovieError = "You must login";
        }
      })
      .addCase(addNewMovie.rejected, (state, action) => {
        state.addMovieError = action.error.message;
      })
      .addCase(addNewMovie.fulfilled, (state, action) => {
        state.addMovieError = "";
        state.movies.push(action.payload);
      })
      .addCase(deletMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload
        );
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        const obj = action.payload;
        const movies = state.movies.filter((movie) => movie._id !== obj._id);
        state.movies = [...movies, obj];
      });
  },
});

export const selectAllMovies = (state) => state.movies.movies;
export const selectSearchMovie = (state) => state.movies.movieToSearch;
export const selectFetchMovieError = (state) => state.movies.fetchMovieError;
export const selectAddMovieError = (state) => state.movies.addMovieError;
export const selectFetchError = (state) => state.movies.moviesStatus;

export const { searchMovie, editMovieId, editMovieUI, addMovieFieldRequiered } =
  movieSlice.actions;
export default movieSlice;
