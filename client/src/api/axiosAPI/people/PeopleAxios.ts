import axios from "axios";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/members";

export interface IMatPeopleInfo {
  memberId: number;
  nickname: string;
  profileImg: string;
}

export const getMatPeople = async (id: number) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

export const followMatPeople = async (memberId: number) => {
  const response = await axios.post(`${url}/followings/${memberId}`);
  return response.data;
};

export const unfollowMatPeople = async (memberId: number) => {
  const response = await axios.delete(`${url}/followings/${memberId}`);

  return response.data;
};
