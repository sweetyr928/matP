/* eslint-disable */
import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";
import MapMarkerComponent from "./MapMarkerComponent";

const MapContainer = styled(Map)`
  width: 100%;
  height: 100vh;
`;

const KakaoMap = () => {
  return (
    // 지도를 표시할 Container
    <MapContainer
      center={{ lat: 37.5554522671854, lng: 126.92415641617547 }}
      level={8}
      isPanto={true}
    >
      <MapMarkerComponent />
    </MapContainer>
  );
};

export default KakaoMap;
