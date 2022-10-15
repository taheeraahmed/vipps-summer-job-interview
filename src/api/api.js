import axios from "axios";

const API_BASE_URL = "https://en.wikipedia.org/w"; //process.env.BASE_URL;

const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: HEADERS,
});
