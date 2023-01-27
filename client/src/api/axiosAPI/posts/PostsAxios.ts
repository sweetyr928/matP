import axios from "axios";
import type { IComments } from "../comments/commentsAxios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080";

axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY3NDc4MjA0MywiZXhwIjoxNjc0ODE4MDQzfQ.6aL5tqmWzmEdYhQgpMNJ891cqaqE_7TtcURKXzr0n30`;

export interface IPosts {
  id: number;
  likes: number;
  commentcount: number;
  thumbnailUrl: string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  star: number;
  memberId: number;
}

export interface IMemberInfo {
  nickname: string;
  profileImg: string;
}

export interface IPlaceInfo {
  id: number;
  title: string;
  content: string;
  likes: number;
  thumbnailUrl: string;
  createdAt: string;
  modifiedAt: string;
  star: number;
  memberInfo: IMemberInfo;
}

export interface IPlacesPosts {
  postInfo: IPlaceInfo;
  comments: Array<IComments>;
  isLikesCheck: boolean;
}

export const getPosts = async () => {
  const response = await axios.get(`${url}/places/posts?page=0&size=30`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY3NDc5Mzc4NCwiZXhwIjoxNjc0ODI5Nzg0fQ.rkpSoh8qjbTEZS8al0IRuu_6GPaLAeaa7WUSLSy7Fhc`,
    },
  });
  return response.data;
};

export const getPlacesPost = async (id: number) => {
  const response = await axios.get(`${url}/placesposts/${id}`);
  return response.data;
};

export const createPost = async (
  nickname: string,
  profileimg: string,
  title: string,
  content: string,
  createdat: string,
  star: number,
  likes: 0,
  thumbnailUrl: string
): Promise<void> => {
  const response = await axios.post(`${url}/placesposts`, {
    nickname,
    profileimg,
    title,
    content,
    createdat,
    star,
    likes,
    thumbnailUrl,
  });
  return response.data;
};

export const updatePost = async (
  title: string,
  content: string,
  createdat: string,
  star: number,
  thumbnailUrl: string,
  id: number
): Promise<void> => {
  const response = await axios.patch(`${url}/placesposts/${id}`, {
    title,
    content,
    createdat,
    star,
    thumbnailUrl,
  });
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  const response = await axios.delete(`${url}/placesposts/${id}`);
  return response.data;
};
