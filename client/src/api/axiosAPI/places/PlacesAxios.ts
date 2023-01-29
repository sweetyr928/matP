import axios from "axios";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/places";

export const getPlaceDetail = async (id: number) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

export const createPlaces = async (
  name: string,
  address: string,
  zonecode: string,
  tel: string,
  category: string
): Promise<void> => {
  const response = await axios.post(url, {
    name,
    address,
    zonecode,
    tel,
    category,
  });
  return response.data;
};
