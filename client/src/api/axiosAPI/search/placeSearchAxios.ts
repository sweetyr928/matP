import axios from "axios";

const url = "https://matp.o-r.kr/search";

interface PlaceData {
  id: number;
  tel: string;
  address: string;
  name: string;
  starAvg: number;
  postCount: number;
  longitude: number;
  latitude: number;
}

export const getSearchPlaceData = async (
  keyword: string
): Promise<PlaceData[]> => {
  const response = await axios.get(`${url}?query=${keyword}`);
  return response.data;
};
