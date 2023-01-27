import styled from "styled-components";
import useAxios from "../hooks/useAxios";
import { getPickersDetail } from "../api/axiosAPI/groups/PickersAxios";
import { useParams } from "react-router-dom";

const MatPickPlaceWrapper = styled.div`
  height: 100%;
  width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 0px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  h1 {
    font-size: 28px;
    font-weight: 500;
    margin-top: 200px;
    margin-bottom: 80px;
  }
`;

const MatPickPlaceList = styled.div`
  width: 100%;
  height: 100%;
`;

const MatPickPlaceItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90px;
  border-bottom: 1px solid #adadad;
  color: #373737;
  font-size: 16px;
  padding: 10px 0;
  cursor: pointer;
  h2 {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
  }
`;

// 각 맛픽커즈 그룹 데이터가 어떻게 오느냐에 따라 달라질 가능성 높음 (보류)

const MatPickerDetail: React.FC = () => {
  const { id } = useParams();
  // const { responseData } = useAxios(() => getPickersDetail(id), [id], false);
  const pickPlacesData = [
    {
      id: 1,
      tel: "",
      address: "경기도 성남시 수정구 산성대로295번길 9, 1(일부)층 (신흥동)",
      name: "해피딜리버리(Happy delivery)",
      starAvg: 4.75,
      postCount: 4,
      longitude: 127.149020861577,
      latitude: 37.4424878693597,
    },
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
    {
      id: 4,
      tel: "",
      address: "서울특별시 영등포구 도신로33길 11, 1층 (도림동)",
      name: "푸드 딜리버리 영등포점",
      starAvg: 5,
      postCount: 1,
      longitude: 126.907169811127,
      latitude: 37.5096772208139,
    },
    {
      id: 5,
      tel: "",
      address: "경상남도 양산시 물금읍 버들2길 7-13, 1층 일부",
      name: "수벙샌드위치",
      starAvg: 0,
      postCount: 0,
      longitude: 128.988008859882,
      latitude: 35.3068770288634,
    },
  ];

  return (
    <MatPickPlaceWrapper>
      <h1>제목</h1>
      <MatPickPlaceList>
        {pickPlacesData &&
          pickPlacesData.map((pickPlace: any) => (
            <MatPickPlaceItem key={pickPlace.id}>
              <h2>{pickPlace.name}</h2>
              <p>{pickPlace.address}</p>
            </MatPickPlaceItem>
          ))}
      </MatPickPlaceList>
    </MatPickPlaceWrapper>
  );
};

export default MatPickerDetail;
