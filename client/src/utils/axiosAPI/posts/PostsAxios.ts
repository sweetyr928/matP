import axios from "axios";
import type { IComments } from "../comments/commentsAxios";

const url = "http://localhost:3001";

export interface IPosts {
  id: number;
  likes: number;
  commentcount: number;
  thumbnail_url: string;
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
  const response = await axios.get(`${url}/posts`);
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
