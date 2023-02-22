import { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { getAllPickersPlaces } from "../../api/axiosAPI/groups/PickersAxios";
import useAxios from "../../hooks/useAxios";

const InfoWindowContainer = styled.div`
  width: 2000%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const PlaceName = styled.div`
  padding: 5px;
  font-size: 15px;
  text-align: center;
`;

interface Place {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  groupImgIndex: number;
}
const markerImg = [
  "https://user-images.githubusercontent.com/94962427/215420707-f35b10a7-f81f-40e7-a975-f7938089555f.svg",
  "https://user-images.githubusercontent.com/94962427/214733289-7588880b-0492-429f-9e7e-8dbc883a88a3.svg",
  "https://user-images.githubusercontent.com/94962427/214733318-efc109a4-439d-4b3a-b17e-ab478ff16102.svg",
  "https://user-images.githubusercontent.com/94962427/214733548-640ad950-b4ce-42cd-ad04-7b37eb4eaf8f.svg",
];

const PickerMarker = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Authorization");
  /**
   * getPickerPlace -> 로그인한 유저의 맛픽커즈 목록 조회
   * pickerPlaces -> 로그인한 유저의 맛픽커즈 목록
   */
  const {
    axiosData: getPickerPlace,
    responseData: pickerPlaces,
    status,
  } = useAxios(getAllPickersPlaces, [token]);

  // 지도에 마커 뿌리기 여부
  const [releaseMarker, setReleaseMarker] = useState(false);
  // 마커에 마우스 누르면 상세 정보 윈도우 뜸
  const [isVisible, setIsVisible] = useState({
    id: -1,
    isVisible: false,
  });

  // 마커 호버시 해당 맛플레이스 페이지로 이동
  const clickHandler = (id: number) => {
    navigate(`/places/${id}`);
  };

  // 토큰이 있고(로그인된 상태 )마커가 아직 뿌려지지 않았다면 로그인한 유저의 맛픽커즈 목록 조회 후 마커 뿌려주기
  useEffect(() => {
    if (token && status === "Success" && !releaseMarker) {
      getPickerPlace();
      setReleaseMarker(true);
    }
  }, [token, status, releaseMarker]);

  return (
    <>
      {token && pickerPlaces
        ? pickerPlaces.map((place: Place) => (
            <MapMarker
              key={place.id}
              image={{
                src: markerImg[place.groupImgIndex],
                size: { width: 25, height: 25 },
              }}
              position={{ lat: place.latitude, lng: place.longitude }}
              clickable={true}
              onMouseOver={() =>
                setIsVisible({ id: place.id, isVisible: true })
              }
              onMouseOut={() => setIsVisible({ id: -1, isVisible: false })}
              onClick={() => clickHandler(place.id)}
            >
              {isVisible.isVisible && isVisible.id === place.id && (
                <InfoWindowContainer>
                  <PlaceName>{place.name}</PlaceName>
                </InfoWindowContainer>
              )}
            </MapMarker>
          ))
        : null}
    </>
  );
};

export default PickerMarker;
