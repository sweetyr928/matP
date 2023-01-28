import axios from "axios";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

const url =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/groups";

export interface PickersData {
  id: number;
  name: string;
  groupImgIndex: number;
}

export const getPickers = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const getPickersDetail = async (id: string | undefined) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

export const createPickers = async (
  name: string,
  groupImgIndex: number
): Promise<void> => {
  const response = await axios.post(url, {
    name,
    groupImgIndex,
  });
  return response.data;
};

export const updatePickers = async (
  id: number,
  name: string,
  groupImgIndex: number
): Promise<void> => {
  const response = await axios.patch(`${url}/${id}`, {
    name,
    groupImgIndex,
  });
  return response.data;
};

export const deletePickers = async (id: number): Promise<void> => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};
