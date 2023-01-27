import axios from "axios";
import type { IComments } from "../comments/commentsAxios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080";

axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY3NDgwOTI1MywiZXhwIjoxNjc0ODQ1MjUzfQ.s0W3wPzOWP-Ce0rLcZP_YEPSvdsh3DHCkNJxjc5-Sqo`;

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

export interface IPostInfo {
  id: number;
  title: string;
  content: string;
  likes: number;
  thumbnailUrl: string;
  createdAt: string;
  modifiedAt: string;
  star: number;
  memberInfo: IMemberInfo;
  placeId: number;
}

export interface IPlacesPost {
  postInfo: IPostInfo;
  isLikesCheck: boolean;
  comments: IComments;
}

export const getPosts = async () => {
  const response = await axios.get(`${url}/places/posts?page=0&size=30`);
  return response.data;
};

export const getPlacesPost = async (id: number) => {
  const response = await axios.get(`${url}/places/1/posts/${id}`);
  console.log(response.data);
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
  const response = await axios.post(`${url}/places/1/posts`, {
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
  const response = await axios.patch(`${url}/places/1/posts/${id}`, {
    title,
    content,
    createdat,
    star,
    thumbnailUrl,
  });
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  const response = await axios.delete(`${url}/places/1/posts/${id}`);
  return response.data;
};
