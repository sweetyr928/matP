/* eslint-disable */
import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";
import MapMarkerComponent from "./MapMarkerComponent";

const MapContainer = styled(Map)`
  width: 100%;
  height: 100vh;
`;

const KakaoMap = () => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.50039427271689, lng: 127.02796438287635 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  return (
    // 지도를 표시할 Container
    <MapContainer center={state.center} level={3}>
      <MapMarkerComponent />
    </MapContainer>
  );
};

export default KakaoMap;
