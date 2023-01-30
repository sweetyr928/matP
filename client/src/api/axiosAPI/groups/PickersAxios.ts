import axios from "../../CustomAxios";

export interface PickersData {
  id: number;
  name: string;
  groupImgIndex: number;
}

export const getPickers = async () => {
  const response = await axios.get("/groups");
  return response.data;
};

export const getPickersDetail = async (id: number) => {
  const response = await axios.get(`/pickers/${id}`);
  return response.data;
};

export const createPickers = async (
  name: string,
  groupImgIndex: number
): Promise<void> => {
  const response = await axios.post("/groups", {
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
  const response = await axios.patch(`/groups/${id}`, {
    name,
    groupImgIndex,
  });
  return response.data;
};

export const deletePickers = async (id: number): Promise<void> => {
  const response = await axios.delete(`/groups/${id}`);
  return response.data;
};

export const createPick = async (
  placeId: number,
  pickerGroupId: number
): Promise<void> => {
  const response = await axios.post("/pickers", {
    placeId,
    pickerGroupId,
  });
  return response.data;
};

export const updatePick = async (
  placeId: number,
  pickerGroupId: number
): Promise<void> => {
  const response = await axios.patch("/pickers", {
    placeId,
    pickerGroupId,
  });
  return response.data;
};

export const deletePick = async (id: number): Promise<void> => {
  const response = await axios.delete(`/pickers/${id}`);
  return response.data;
};
