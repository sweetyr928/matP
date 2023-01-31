import axios from "axios";

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/places/posts/search";

interface PostData {
  id: number;
  title: string;
  content: string;
  commentcount: number;
  likes: number;
  thumbnailUrl: string;
  createdAt: string;
  modifiedAt: string;
  star: number;
  memberId: number;
  placeId: number;
}

export const getSearchTitleData = async (keyword: string): Promise<PostData[]> => {
  const response = await axios.get(`${url}/title?keyword=${keyword}&page=0&size=30`);
  return response.data;
};

export const getSearchContentData = async (keyword: string): Promise<PostData[]> => {
  const response = await axios.get(`${url}/content?keyword=${keyword}&page=0&size=30`);
  return response.data;
};
