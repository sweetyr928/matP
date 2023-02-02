import { atom } from "recoil";

export const curruntLocationPlacesState = atom({
  key: "curruntLocationPlacesState",
  default: [],
});

export const curruntLocationState = atom({
  key: "curruntLocationState",
  default: {
    level: 7,
    center: {
      lat: 37.56667437551163,
      lng: 126.95764417493172,
    },
  },
});

export const curruntLocationStatusState = atom({
  key: "curruntLocationStatusState",
  default: "Idle",
});
