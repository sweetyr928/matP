import axios from "axios";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
const url = "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/search";

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

export const getSearchPlaceData = async (keyword: string): Promise<PlaceData[]> => {
  const response = await axios.get(`${url}?query=${keyword}`);
  return response.data;
};
