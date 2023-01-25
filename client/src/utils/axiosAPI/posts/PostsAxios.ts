import axios from "axios";
import type { IComments } from "../comments/commentsAxios";

const url = "http://localhost:3001";

export interface IPosts {
  postId: number;
  likes: number;
  commentcount: number;
  thumbnail_url: string;
}

export interface IPlacesPosts {
  id: number;
  nickname: string;
  profileimg: string;
  createdat: string;
  title: string;
  content: string;
  star: number;
  likes: number;
  thumbnailUrl: string;
  comments: Array<IComments>;
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
