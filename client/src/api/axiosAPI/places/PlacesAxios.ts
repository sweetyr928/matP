import axios from "axios";
import instance from "../../CustomAxios";

const url = "https://matp.p-e.kr/places";

export interface IMatPlace {
  id: number;
  tel: string;
  address: string;
  name: string;
  starAvg: number;
  postCount: number;
  longitude: number;
  latitude: number;
}

export const getPlaceDetail = async (id: number) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

export const getPlaceDetailForUser = async (id: number) => {
  const response = await instance.get(`/places/${id}`);
  return response.data;
};

export const createPlaces = async (
  name: string,
  address: string,
  zonecode: string,
  tel: string,
  category: string
): Promise<void> => {
  const response = await instance.post("/places", {
    name,
    address,
    zonecode,
    tel,
    category,
  });
  return response.data;
};
