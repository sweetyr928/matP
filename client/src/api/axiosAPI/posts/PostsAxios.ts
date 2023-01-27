import axios from "axios";
import type { IComments } from "../comments/commentsAxios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080";

axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY3NDgxOTUxNywiZXhwIjoxNjc0ODU1NTE3fQ.vM6laZOP4lB_ZMg9M7sgqqwsIlNvHH-KS5gzuF4v-oQ`;

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
  console.log(title);
  console.log(content);
  console.log(thumbnailUrl);
  console.log(star);
  const response = await axios.post(`${url}/places/${placeId}/posts`, {
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
  id: number
): Promise<void> => {
  const response = await axios.patch(`${url}/places/1/posts/${id}`, {
    title,
    content,
    thumbnailUrl,
    star,
  });
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  console.log(id);
  const response = await axios.delete(`${url}/places/1/posts/${id}`);
  return response.data;
};
