import axios from "axios";

const API = axios.create({
  baseURL: "https://hamper-project-pjl8.vercel.app/api",
  withCredentials: true, // VERY IMPORTANT for cookies
});

export default API;