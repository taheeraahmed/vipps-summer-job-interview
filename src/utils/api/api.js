import axios from "axios";

const API_BASE_URL = "https://en.wikipedia.org/w";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
