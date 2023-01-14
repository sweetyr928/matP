/* eslint-disable */
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";

const MapContainer = styled(Map)`
  width: 100%;
  height: 100vh;
`;

const InfoWindowContainer = styled.div`
  min-width: 150px;
`;

const InfoValue = styled.div`
  padding: 5px;
`;

const KakaoMap = () => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.50039427271689, lng: 127.02796438287635 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 지도를 표시할 Container
    <MapContainer center={state.center} level={3}>
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: 37.50039427271689,
          lng: 127.02796438287635,
        }}
        clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
        image={{
          src: "https://cdn-icons-png.flaticon.com/512/7988/7988273.png", // 마커이미지의 주소입니다
          size: {
            width: 30,
            height: 30,
          }, // 마커이미지의 크기입니다
        }}
        onClick={() => setIsOpen(true)}
      >
        {isOpen && (
          <InfoWindowContainer onClick={() => setIsOpen(false)}>
            {/* <img
              alt="close"
              width="14"
              height="13"
              src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
              style={{
                position: "absolute",
                right: "5px",
                top: "5px",
                cursor: "pointer",
              }}
            /> */}
            <InfoValue>땀땀</InfoValue>
          </InfoWindowContainer>
        )}
      </MapMarker>
    </MapContainer>
  );
};

export default KakaoMap;
