import axios from "axios";
import { IMemberInfo } from "../posts/PostsAxios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

export interface IComments {
  CommentId: number;
  memberInfo: IMemberInfo;
  commentContent: string;
  commentCreatedAt: string;
}

export const createComment = async (
  content: string,
  placeId: number,
  postId: number
): Promise<void> => {
  const response = await axios.post(
    `${url}/places/${placeId}/posts/${postId}/comments`,
    {
      content,
    }
  );
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
