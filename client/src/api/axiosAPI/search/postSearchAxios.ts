import axios from "axios";

const url = "https://matp.p-e.kr/places/posts/search";

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

export const getSearchTitleData = async (
  keyword: string
): Promise<PostData[]> => {
  const response = await axios.get(
    `${url}/title?keyword=${keyword}&page=0&size=30`
  );
  return response.data;
};

export const getSearchContentData = async (
  keyword: string
): Promise<PostData[]> => {
  const response = await axios.get(
    `${url}/content?keyword=${keyword}&page=0&size=30`
  );
  return response.data;
};
