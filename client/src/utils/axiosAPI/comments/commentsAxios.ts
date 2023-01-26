import axios from "axios";
const url = "http://localhost:3001";

export interface IComments {
  id: number;
  nickname: string;
  profileImg: string;
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
