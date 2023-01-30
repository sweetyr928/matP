import axios from "axios";

const instance = axios.create({
  baseURL:
    "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
  },
});

export default instance;
