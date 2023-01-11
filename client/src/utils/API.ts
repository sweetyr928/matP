import axios from "axios";

const url = "http://localhost:3001";

// export const questionCreate = async (url: string, title: string, content: string) => {
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

// export const questionDelete = async (id: number) => {
//   try {
//     await axios.delete(`${url}/questions/${id}`);
//     window.location.reload();
//   } catch (error) {
//     console.error("Error", error);
//   }
// };
