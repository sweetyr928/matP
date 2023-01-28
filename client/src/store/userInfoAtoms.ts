import { atom } from "recoil";

const userInfoState = atom({
  key: "userInfoState",
  default: {},
});

export { userInfoState };
