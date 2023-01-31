import axios from "axios";
import instance from "../../CustomAxios";
import type { IComments } from "../comments/commentsAxios";

const url = "https://matp.p-e.kr:8080";

export interface IPosts {
  id: number;
  likes: number;
  commentcount?: number;
  thumbnailUrl: string;
  title: string;
  content?: string;
  createdAt?: string;
  modifiedAt?: string;
  star?: number;
  memberId?: number;
  placeId?: number;
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

export interface IMyPostInfo {
  id: number;
  title: string;
  likes: number;
  thumbnailUrl: string;
}

export interface IPlacesPost {
  postInfo: IPostInfo;
  isLikesCheck: boolean;
  comments: IComments[];
}

export const getPosts = async () => {
  const response = await axios.get(`${url}/places/posts?page=0&size=21`);
  return response.data;
};

export const getPagePosts = async (page: number, limit: number) => {
  const response = await axios.get(
    `${url}/places/posts?page=${page}&size=${limit}`
  );
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
  const response = await instance.post(`/places/${placeId}/posts`, {
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
  const response = await instance.patch(`/places/${placeId}/posts/${id}`, {
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
  const response = await instance.delete(`/places/${placeId}/posts/${id}`);
  return response.data;
};

export const likePost = async (id: number, placeId: number): Promise<void> => {
  const response = await instance.post(`/places/${placeId}/posts/${id}/likes`, {
    likesCheck: 1,
  });
  return response.data;
};

export const dislikePost = async (
  id: number,
  placeId: number
): Promise<void> => {
  const response = await instance.delete(
    `/places/${placeId}/posts/${id}/likes`
  );

  return response.data;
};
