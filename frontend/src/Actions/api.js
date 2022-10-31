import axios from "axios";
const apiInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;
