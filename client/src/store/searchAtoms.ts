import { atom } from "recoil";

export const searchResultsState = atom({
  key: "searchResultsState",
  default: [],
});

// searchStatusState는 검색 후 데이터가 오는지 안오는지의 기준을 세운 스토어
// "loading", "success", "error" 3개가 들어감
export const searchStatusState = atom({
  key: "searchStatusState",
  default: "idle",
});
