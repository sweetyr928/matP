import { atom } from "recoil";

export const searchResultsState = atom({
  key: "searchResultsState",
  default: [
    {
      id: 0,
      latitude: 37.50039427271689,
      longitude: 127.02796438287635,
      placeName: "땀땀",
      markerImg: 1,
    },
    {
      id: 1,
      latitude: 37.50291259854013,
      longitude: 127.02790312039619,
      placeName: "에이비카페 At Bali",
      markerImg: 1,
    },
    {
      id: 2,
      latitude: 37.48196664784874,
      longitude: 126.94178415397097,
      placeName: "행수곱창 봉천본점",
      markerImg: 1,
    },
  ],
});

// searchStatusState는 검색 후 데이터가 오는지 안오는지의 기준을 세운 스토어
// "loading", "success", "error" 3개가 들어감
export const searchStatusState = atom({
  key: "searchStatusState",
  default: "idle",
});
