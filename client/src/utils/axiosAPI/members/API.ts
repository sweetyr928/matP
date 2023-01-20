import axios from "axios";

const url = "http://localhost:3001";

export const memberUpdate = async (
  nickname: string,
  profileImg: string,
  memo: string
): Promise<void> => {
  await axios.patch(`${url}/members`, {
    nickname,
    profileImg,
    memo,
  });
};
