import axios from "axios";

const API_BASE_URL = "https://en.wikipedia.org/w"; //process.env.BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});
