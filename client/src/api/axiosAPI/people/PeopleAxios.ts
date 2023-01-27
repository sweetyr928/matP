import axios from "axios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080";

axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY3NDc4MjA0MywiZXhwIjoxNjc0ODE4MDQzfQ.6aL5tqmWzmEdYhQgpMNJ891cqaqE_7TtcURKXzr0n30`;

export const getMatPeople = async (id: number) => {
  const response = await axios.get(`${url}/members/${id}`);
  return response.data;
};
