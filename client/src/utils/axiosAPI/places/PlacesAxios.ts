import axios from "axios";

const url = "http://localhost:3001/places";

export interface PlaceData {
  id: number;
  placeImg: string;
  tel: string;
  address: string;
  roadNameAddress: string;
  name: string;
  category: string;
  starAvg: number;
  starCount: Array<number>;
  postCount: number;
  isPick: true;
  longitude: number;
  latitude: number;
  postList: Array<Post>;
}

export interface Post {
  id: number;
  likes: number;
  thumbnailUrl: string;
  star: number;
}

export const getPlaceDetail = async () => {
  const response = await axios.get(url);
  return response.data;
};
