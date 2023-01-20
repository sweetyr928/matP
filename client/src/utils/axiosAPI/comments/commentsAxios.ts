import axios from "axios";
const url = "http://localhost:3001";

export interface IComments {
  commentId: number;
  nickname: string;
  profileimg: string;
  comment: string;
  createdat: string;
}

export const createComment = async (
  nickname: string,
  profileimg: string,
  comment: string,
  createdat: string
): Promise<void> => {
  try {
    await axios.post(`${url}/comments`, {
      nickname,
      profileimg,
      comment,
      createdat,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const updateComment = async (
  nickname: string,
  profileimg: string,
  comment: string,
  createdat: string,
  id: number
): Promise<void> => {
  try {
    await axios.patch(`${url}/comments/${id}`, {
      nickname,
      profileimg,
      comment,
      createdat,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${url}/comments/${id}`);
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
