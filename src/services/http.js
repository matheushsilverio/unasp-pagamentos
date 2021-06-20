import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ["*", process.env.VUE_APP_API_URL],
  },
});

export default http;
