import axios from "../../CustomAxios";
import { IMemberInfo } from "../posts/PostsAxios";

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
    `/places/${placeId}/posts/${postId}/comments`,
    {
      content,
    }
  );
  return response.data;
};

export const updateComment = async (
  content: string,
  placeId: number,
  postId: number,
  commentId: number
): Promise<void> => {
  const response = await axios.patch(
    `/places/${placeId}/posts/${postId}/comments/${commentId}`,
    {
      content,
    }
  );
  return response.data;
};

export const deleteComment = async (
  placeId: number,
  postId: number,
  commentId: number
): Promise<void> => {
  const response = await axios.delete(
    `/places/${placeId}/posts/${postId}/comments/${commentId}`
  );
  return response.data;
};
