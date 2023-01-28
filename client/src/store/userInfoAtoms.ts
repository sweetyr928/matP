import { atom } from "recoil";

const userInfoState = atom({
  key: "userInfoState",
  default: {
    id: 5,
    email: "",
    nickname: "",
    birthday: "",
    profileUrl: "",
    gender: 0,
    memo: "",
    followers: 0,
    followings: 0,
    postInfos: [],
    pickerGroupInfos: [],
  },
});

export { userInfoState };
