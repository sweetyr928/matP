import axios from "axios";

const url = "http://localhost:3001";

// import axios from "axios";

// export const questionCreate = async () => {
//   try {
//     await axios.post(`${url}/questions`, {
//       title: title,
//       content: content,
//     });
//   } catch (error) {
//     console.error("Error", error);
//   }
// };

export const memberUpdate = async (
  nickname: string,
  profileImg: string,
  memo: string
): Promise<void> => {
  try {
    await axios.patch(`${url}/members`, {
      nickname,
      profileImg,
      memo,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const commentCreate = async (
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

export const commentUpdate = async (
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

export const commentDelete = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${url}/comments/${id}`);
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const postCreate = async (
  nickname: string,
  profileimg: string,
  title: string,
  content: string,
  createdat: string,
  star: number
): Promise<void> => {
  try {
    await axios.post(`${url}/placesposts`, {
      nickname,
      profileimg,
      title,
      content,
      createdat,
      star,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const postUpdate = async (
  title: string,
  content: string,
  createdat: string,
  star: number,
  id: number
): Promise<void> => {
  try {
    await axios.patch(`${url}/placesposts/${id}`, {
      title,
      content,
      createdat,
      star,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const postDelete = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${url}/placesposts/${id}`);
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

// export const questionDelete = async (id) => {
//   try {
//     await axios.delete(`${url}/questions/${id}`);
//     window.location.reload();
//   } catch (error) {
//     console.error("Error", error);
//   }
// };
