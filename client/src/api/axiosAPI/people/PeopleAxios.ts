import axios from "axios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY3NDgxOTUxNywiZXhwIjoxNjc0ODU1NTE3fQ.vM6laZOP4lB_ZMg9M7sgqqwsIlNvHH-KS5gzuF4v-oQ`;

export const getMatPeople = async (id: number) => {
  const response = await axios.get(`${url}/members/${id}`);
  return response.data;
};
