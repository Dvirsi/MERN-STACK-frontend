import axios from "axios";

const url = "http://localhost:8000/api/subscription/";

axios.defaults.withCredentials = true;

const getAllSubs = () => {
  return axios.get(url);
};

const getSubById = (id) => {
  return axios.get(url + id);
};

const addSub = (obj) => {
  return axios.post(url, obj);
};

export default { getAllSubs, addSub, getSubById };
