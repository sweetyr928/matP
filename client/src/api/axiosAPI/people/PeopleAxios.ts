import axios from "axios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

export const getMatPeople = async (id: number) => {
  const response = await axios.get(`${url}/members/${id}`);
  return response.data;
};
