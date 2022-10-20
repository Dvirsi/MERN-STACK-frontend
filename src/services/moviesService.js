import axios from "axios";

const url = "http://localhost:8000/api/movie/";

axios.defaults.withCredentials = true;

const getAllMovies = () => {
  return axios.get(url);
};

const addMovie = (obj) => {
  return axios.post(url, obj);
};

const deleteMovie = (id) => {
  return axios.delete(url + id);
};

const updateMovie = (id, obj) => {
  return axios.put(url + id, obj);
};

export default { getAllMovies, addMovie, deleteMovie, updateMovie };
