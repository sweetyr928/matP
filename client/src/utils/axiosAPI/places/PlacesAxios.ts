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
  pickCount: number;
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

export const createPlaces = async (
  name: string,
  address: string,
  roadNameAddress: string,
  tel: string,
  category: string
): Promise<void> => {
  const response = await axios.post(url, {
    name,
    address,
    roadNameAddress,
    tel,
    category,
  });
  return response.data;
};
