import axios from "axios";

const url = "https://matp.o-r.kr/members";

export interface IPeopleSearch {
  id: number;
  nickname: string;
  profileUrl: string;
  memo: string;
  followers: number;
}

export const getSearchPeople = async (
  nickname: string
): Promise<IPeopleSearch[]> => {
  const response = await axios.get(`${url}?nickname=${nickname}`);
  return response.data;
};
