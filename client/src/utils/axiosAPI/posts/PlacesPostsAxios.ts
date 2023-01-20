import axios from "axios";

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
  try {
    await axios.post(`${url}/placesposts`, {
      nickname,
      profileimg,
      title,
      content,
      createdat,
      star,
      likes,
      thumbnailUrl,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const updatePost = async (
  title: string,
  content: string,
  createdat: string,
  star: number,
  thumbnailUrl: string,
  id: number
): Promise<void> => {
  try {
    await axios.patch(`${url}/placesposts/${id}`, {
      title,
      content,
      createdat,
      star,
      thumbnailUrl,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${url}/placesposts/${id}`);
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
