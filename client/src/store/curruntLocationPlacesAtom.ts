import { atom } from "recoil";

export const curruntLocationPlacesState = atom({
  key: "curruntLocationPlacesState",
  default: [],
});

export const curruntLocationStatusState = atom({
  key: "curruntLocationStatusState",
  default: "Idle",
});
