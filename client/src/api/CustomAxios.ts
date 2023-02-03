import axios from "axios";

const instance = axios.create({
  baseURL: "https://matp.o-r.kr/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  },
});

export default instance;
