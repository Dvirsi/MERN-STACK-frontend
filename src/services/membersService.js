import axios from "axios";

const url = "http://localhost:8000/api/member/";

axios.defaults.withCredentials = true;

const getAllMembers = () => {
  return axios.get(url);
};

const addMember = (obj) => {
  return axios.post(url, obj);
};

const deleteMember = (id) => {
  return axios.delete(url + id);
};

const updateMember = (id, obj) => {
  return axios.put(url + id, obj);
};

export default { getAllMembers, addMember, deleteMember, updateMember };
