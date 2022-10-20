import axios from "axios";

const url = "http://localhost:8000/api/user/";
axios.defaults.withCredentials = true;

const login = (user) => {
  return axios.post(url + "login", user);
};

const signup = (user) => {
  return axios.post(url + "register", user);
};

export default { login, signup };
