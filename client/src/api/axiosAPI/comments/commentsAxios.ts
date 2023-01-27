import axios from "axios";
import { IMemberInfo } from "../posts/PostsAxios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImlhdCI6MTY3NDgxOTUxNywiZXhwIjoxNjc0ODU1NTE3fQ.vM6laZOP4lB_ZMg9M7sgqqwsIlNvHH-KS5gzuF4v-oQ`;

export interface IComments {
  CommentId: number;
  memberInfo: IMemberInfo;
  commentContent: string;
  commentCreatedAt: string;
}

export const getComments = async () => {
  const response = await axios.get<IComments[]>(`${url}/comments`);
  return response.data;
};

export const createComment = async (
  nickname: string,
  profileImg: string,
  commentContent: string,
  commentCreatedAt: string
): Promise<void> => {
  const response = await axios.post(`${url}/comments`, {
    nickname,
    profileImg,
    commentContent,
    commentCreatedAt,
  });
  return response.data;
};

export const updateComment = async (
  nickname: string,
  profileImg: string,
  commentContent: string,
  commentCreatedAt: string,
  id: number
): Promise<void> => {
  const response = await axios.patch(`${url}/comments/${id}`, {
    nickname,
    profileImg,
    commentContent,
    commentCreatedAt,
  });
  return response.data;
};

export const deleteComment = async (id: number): Promise<void> => {
  const response = await axios.delete(`${url}/comments/${id}`);
  return response.data;
};
