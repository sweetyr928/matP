import axios from "axios";
import instance from "../../CustomAxios";
import { IPosts } from "../posts/PostsAxios";

const url = "https://matp.p-e.kr:8080/members";

export interface IMatPeopleInfo {
  memberId: number;
  nickname: string;
  profileUrl: string;
  memo: string;
  followings: number;
  followers: number;
  isFollowing: boolean;
  postInfos: IPosts[];
  pickerGroupInfos: pickerGroupInfo[];
}

export interface pickerGroupInfo {
  id: number;
  name: number;
  groupImgIndex: number;
}

export const getMatPeopleInfoForUser = async (id: number) => {
  const response = await instance.get(`/members/${id}`);
  return response.data;
};

export const getMatPeople = async (id: number) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

export const followMatPeople = async (memberId: number) => {
  const response = await instance.post(`/members/followings/${memberId}`);
  return response.data;
};

export const unfollowMatPeople = async (memberId: number) => {
  const response = await instance.delete(`/members/followings/${memberId}`);

  return response.data;
};
