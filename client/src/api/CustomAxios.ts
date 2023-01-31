import axios from "axios";

const instance = axios.create({
  baseURL: "https://matp.p-e.kr:8080",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  },
});

export default instance;
