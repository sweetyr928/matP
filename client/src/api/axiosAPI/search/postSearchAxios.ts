import axios from "axios";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/search";

interface PostData {
  id: number;
  title: string;
  content: string;
  likes: number;
  thumbnailUrl: string;
  createdAt: string;
  modifiedAt: string;
  star: number;
  memberId: number;
  placeId: number;
}

export const getSearchTitleData = async (
  keyword: string
): Promise<PostData[]> => {
  const response = await axios.get(`${url}/title?query=${keyword}`);
  return response.data;
};

export const getSearchContentData = async (
  keyword: string
): Promise<PostData[]> => {
  const response = await axios.get(`${url}/content?query=${keyword}`);
  return response.data;
};
