import { atom } from "recoil";

export const curruntLocationPlacesState = atom({
  key: "curruntLocationPlacesState",
  default: [],
});

export const curruntLocationState = atom({
  key: "curruntLocationState",
  default: {
    level: 0,
    center: {
      lat: 0,
      lng: 0,
    },
  },
});

export const curruntLocationStatusState = atom({
  key: "curruntLocationStatusState",
  default: "Idle",
});
