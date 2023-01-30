import axios from "axios";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/members";

export interface IPeopleSearch {
  id: number;
  nickname: string;
  profileUrl: string;
  memo: string;
  followers: number;
}

export const getSearchPeople = async (
  nickname: string
): Promise<IPeopleSearch[]> => {
  const response = await axios.get(`${url}?nickname=${nickname}`);
  return response.data;
};
