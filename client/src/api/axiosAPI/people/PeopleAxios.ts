import axios from "axios";

const url = "http://localhost:3001";

export const getMatPeople = async () => {
  const response = await axios.get(`${url}/people`);
  return response.data;
};
