import axios from "axios";

const url = "http://localhost:3001/members";

interface MemberData {
  nickname: string;
  email: string;
  birthday: string;
  profileImg: string;
  gender: string;
  memo: string;
  createdAt: string;
  modifiedAt: string;
  followers: string;
  followings: string;
  postlist: Array<Post>;
  picklist: Array<Pick>;
}
interface Post {
  postId: number;
  likes: number;
  commentcount: number;
  thumbnail_url: string;
}

interface Pick {
  groupId: number;
  name: string;
  color: string;
}

export const getMyData = async (): Promise<MemberData> => {
  const response = await axios.get<MemberData>(url);
  return response.data;
};

export const updateMyData = async (
  nickname: string,
  profileImg: string,
  memo: string
): Promise<MemberData> => {
  const response = await axios.patch(`${url}`, {
    nickname,
    profileImg,
    memo,
  });
  return response.data;
};
