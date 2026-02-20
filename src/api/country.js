import axios from "./axios.js";

export const getAll = () =>
  axios.get("/all?fields=name,capital,flags,population,cca3,translations");

export const getByName = (name) => {
  return axios.get(`/name/${name}`);
};
