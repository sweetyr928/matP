import axios from "axios";
import type { IComments } from "../comments/commentsAxios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080";

const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

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
  placeId: number;
}

export interface IMemberInfo {
  nickname: string;
  profileUrl: string;
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
  comments: IComments[];
}

export const getPosts = async () => {
  const response = await axios.get(`${url}/places/posts?page=0&size=30`);
  return response.data;
};

export const getPlacesPost = async (id: number, placeId: number) => {
  const response = await axios.get(`${url}/places/${placeId}/posts/${id}`);
  return response.data;
};

export const createPost = async (
  title: string,
  content: string,
  thumbnailUrl: string,
  star: number,
  placeId: number
): Promise<void> => {
  const response = await axios.post(`${url}/places/${placeId}/posts`, {
    placeId,
    title,
    content,
    thumbnailUrl,
    star,
  });

  return response.data;
};

export const updatePost = async (
  title: string,
  content: string,
  thumbnailUrl: string,
  star: number,
  placeId: number,
  id: number
): Promise<void> => {
  const response = await axios.patch(`${url}/places/${placeId}/posts/${id}`, {
    title,
    content,
    thumbnailUrl,
    star,
  });
  return response.data;
};

export const deletePost = async (
  id: number,
  placeId: number
): Promise<void> => {
  const response = await axios.delete(`${url}/places/${placeId}/posts/${id}`);
  return response.data;
};

export const likePost = async (id: number, placeId: number): Promise<void> => {
  const response = await axios.post(
    `${url}/places/${placeId}/posts/${id}/likes`,
    {
      likesCheck: 1,
    }
  );
  return response.data;
};

export const dislikePost = async (
  id: number,
  placeId: number
): Promise<void> => {
  const response = await axios.delete(
    `${url}/places/${placeId}/posts/${id}/likes`
  );
  return response.data;
};
