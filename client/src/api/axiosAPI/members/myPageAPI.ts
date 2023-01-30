import axios from "../../CustomAxios";

interface MemberData {
  id: number;
  email: string;
  nickname: string;
  birthday: string;
  profileUrl: string;
  gender: number;
  memo: string;
  followers: number;
  followings: number;
  postInfos: Array<{
    id: number | null;
    title: string | null;
    thumbnailUrl: string | null;
    likes: number | null;
  }>;
  pickerGroupInfos: Array<{
    id: number;
    name: string;
    groupImgIndex: number;
  }>;
}

interface FollowData {
  memberId: number;
  nickname: string;
  profileUrl: string;
}

export const getMyData = async (): Promise<MemberData> => {
  const response = await axios.get<MemberData>("/members/mypage");
  return response.data;
};

export const convertImageUrl = async (formData: any): Promise<any> => {
  const response = await axios.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data.path;
};

export const updateMyData = async (
  nickname: string,
  profileUrl: string,
  memo: string
): Promise<MemberData> => {
  const response = await axios.patch("/members", {
    nickname,
    profileUrl,
    memo,
  });
  return response.data;
};

export const getMyFollowings = async (): Promise<FollowData[]> => {
  const response = await axios.get<FollowData[]>("/members/followings");
  return response.data;
};
export const getMyFollowers = async (): Promise<FollowData[]> => {
  const response = await axios.get<FollowData[]>("/members/followers");
  return response.data;
};
