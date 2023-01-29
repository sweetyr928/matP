import { atom } from "recoil";

export const searchResultsState = atom({
  key: "searchResultsState",
  default: [
    {
      id: 2,
      tel: "",
      address: "경기도 안성시 공도읍 공도3로 9-9, 공도 일번가타워 1층 107호",
      name: "79대포 안성공도점",
      starAvg: 5,
      postCount: 1,
      longitude: 127.169546641942,
      latitude: 37.0000658451218,
    },
    {
      id: 3,
      tel: "",
      address: "경기도 안성시 대덕면 중앙대학로 116-1, 2층",
      name: "맛있어2(Masisso2)",
      starAvg: 5,
      postCount: 1,
      longitude: 127.223888763441,
      latitude: 37.0011803133838,
    },
  ],
});

// searchStatusState는 검색 후 데이터가 오는지 안오는지의 기준을 세운 스토어
// "Loading", "Success", "Error" 3개가 들어감
export const searchStatusState = atom({
  key: "searchStatusState",
  default: "Idle",
});
