import axios from "axios";
const jwtToken = localStorage.getItem("Authorization");
axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

const url1 =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/groups";

const url2 =
  "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/pickers";

export interface PickersData {
  id: number;
  name: string;
  groupImgIndex: number;
}

export const getPickers = async () => {
  const response = await axios.get(url1);
  return response.data;
};

export const getPickersDetail = async (id: number) => {
  const response = await axios.get(`${url2}/${id}`);
  return response.data;
};

export const createPickers = async (
  name: string,
  groupImgIndex: number
): Promise<void> => {
  const response = await axios.post(url1, {
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
  const response = await axios.patch(`${url1}/${id}`, {
    name,
    groupImgIndex,
  });
  return response.data;
};

export const deletePickers = async (id: number): Promise<void> => {
  const response = await axios.delete(`${url1}/${id}`);
  return response.data;
};

export const createPick = async (
  placeId: number,
  pickerGroupId: number
): Promise<void> => {
  const response = await axios.post(url2, {
    placeId,
    pickerGroupId,
  });
  return response.data;
};

export const updatePick = async (
  placeId: number,
  pickerGroupId: number
): Promise<void> => {
  const response = await axios.patch(url2, {
    placeId,
    pickerGroupId,
  });
  return response.data;
};

export const deletePick = async (id: number): Promise<void> => {
  const response = await axios.delete(`${url2}/${id}`);
  return response.data;
};
