import axios from "axios";
const url = "http://localhost:3001";

export interface IComments {
  commentId: number;
  nickname: string;
  profileimg: string;
  comment: string;
  createdat: string;
}

export const getComments = async () => {
  const response = await axios.get<IComments[]>(`${url}/comments`);
  return response.data;
};

export const createComment = async (
  nickname: string,
  profileimg: string,
  comment: string,
  createdat: string
): Promise<void> => {
  const response = await axios.post(`${url}/comments`, {
    nickname,
    profileimg,
    comment,
    createdat,
  });
  return response.data;
};

export const updateComment = async (
  nickname: string,
  profileimg: string,
  comment: string,
  createdat: string,
  id: number
): Promise<void> => {
  const response = await axios.patch(`${url}/comments/${id}`, {
    nickname,
    profileimg,
    comment,
    createdat,
  });
  return response.data;
};

export const deleteComment = async (id: number): Promise<void> => {
  const response = await axios.delete(`${url}/comments/${id}`);
  return response.data;
};
