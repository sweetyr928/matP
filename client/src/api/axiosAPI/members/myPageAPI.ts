import axios from "axios";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/members";

interface MemberData {
  nickname: string;
  email: string;
  birthday: string;
  profileUrl: string;
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

interface FollowData {
  memberId: number;
  nickname: string;
  profileUrl: string;
}

export const getMyData = async (): Promise<MemberData> => {
  const response = await axios.get<MemberData>(`${url}/mypage`);
  return response.data;
};

export const convertImageUrl = async (formData: any): Promise<any> => {
  const response = await axios.post(
    "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data.path;
};

export const updateMyData = async (
  nickname: string,
  profileUrl: string,
  memo: string
): Promise<MemberData> => {
  const response = await axios.patch(`${url}`, {
    nickname,
    profileUrl,
    memo,
  });
  return response.data;
};

export const getMyFollowings = async (): Promise<FollowData[]> => {
  const response = await axios.get<FollowData[]>(`${url}/followings`);
  return response.data;
};
export const getMyFollowers = async (): Promise<FollowData[]> => {
  const response = await axios.get<FollowData[]>(`${url}/followers`);
  return response.data;
};
