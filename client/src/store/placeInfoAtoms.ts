import { atom } from "recoil";

interface PlaceInfo {
  id: number;
  tel: string;
  img: string;
  address: string;
  zonecode: string;
  name: string;
  category: string;
  starAvg: number;
  starCount: number[];
  fiveStarProbability: string;
  postCount: number;
  pickCount: number;
  isPick: boolean;
  groupName: string | null;
  groupImgIndex: number;
  longitude: number;
  latitude: number;
  posts: Array<{
    id: number;
    img: string;
    starAvg: number;
    text: string;
    author: {
      id: number;
      username: string;
    };
    createdAt: string;
    updatedAt: string;
  }>;
}

const defaultPlaceInfo: PlaceInfo = {
  id: -1,
  tel: "",
  img: "",
  address: "",
  zonecode: "",
  name: "",
  category: "",
  starAvg: 0,
  starCount: [],
  fiveStarProbability: "",
  postCount: 0,
  pickCount: 0,
  isPick: false,
  groupName: null,
  groupImgIndex: 0,
  longitude: null,
  latitude: null,
  posts: [],
};

export const placeInfoState = atom<PlaceInfo>({
  key: "placeInfoState",
  default: defaultPlaceInfo,
});

export const placeInfoStatusState = atom({
  key: "placeInfoStatusState",
  default: "Idle",
});
