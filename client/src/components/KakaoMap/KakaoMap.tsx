/* eslint-disable */
import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { placeInfoState, placeInfoStatusState } from "../../store/placeInfoAtoms";
import MapMarkerComponent from "./MapMarkerComponent";

const MapContainer = styled(Map)`
  width: 100%;
  height: 100vh;
`;

const KakaoMap = () => {
  const placeInfo = useRecoilValue(placeInfoState);
  const placeInfoStatus = useRecoilValue(placeInfoStatusState);
  useEffect(() => {}, [placeInfo]);
  const readjustLat = placeInfo.latitude - 0.0003;
  const readjustLng = placeInfo.longitude - 0.0009;

  return (
    <>
      {placeInfo && placeInfoStatus === "Success" ? (
        <MapContainer center={{ lat: readjustLat, lng: readjustLng }} level={3} isPanto={true}>
          <MapMarkerComponent />
        </MapContainer>
      ) : (
        <MapContainer
          center={{ lat: 37.5554522671854, lng: 126.92415641617547 }}
          level={8}
          isPanto={false}
        >
          <MapMarkerComponent />
        </MapContainer>
      )}
    </>
  );
};

export default KakaoMap;
