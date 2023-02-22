/* eslint-disable */
import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { curruntLocationState } from "../../store/curruntLocationPlacesAtom";
import {
  placeInfoState,
  placeInfoStatusState,
} from "../../store/placeInfoAtoms";
import PickerMarker from "./PickerMarker";
import PlaceDetailMarker from "./PlaceDetailMarker";
import SearchMarker from "./SearchMarker";

const MapContainer = styled(Map)`
  width: 100%;
  height: 100vh;
`;

interface getCenterType {
  getLevel: () => any;
  getCenter: () => {
    (): any;
    new (): any;
    getLat: { (): any; new (): any };
    getLng: { (): any; new (): any };
  };
}

const KakaoMap = () => {
  const token = localStorage.getItem("Authorization");
  const placeInfoStatus = useRecoilValue(placeInfoStatusState);
  const { latitude, longitude } = useRecoilValue(placeInfoState);
  const setCurruntLocation = useSetRecoilState(curruntLocationState);

  const [centerMove, setCenterMove] = useState({
    lat: 37.56667437551163,
    lng: 126.95764417493172,
  });

  // 맛플레이스 페이지 이동 시 해당 맛플레이스 정보 있으면 status "Success"되며 지도 해당 음식점 좌표로 이동
  useEffect(() => {
    if (placeInfoStatus === "Success") {
      setCenterMove({
        lat: latitude,
        lng: longitude,
      });
    }
    if (placeInfoStatus === "Loading" || placeInfoStatus === "Idle") {
      setCenterMove({ lat: null, lng: null });
    }
  }, [placeInfoStatus, latitude, longitude]);

  return (
    <>
      <MapContainer
        center={{
          lat: centerMove.lat || 37.56667437551163,
          lng: centerMove.lng || 126.95764417493172,
        }}
        level={7}
        isPanto={true}
        onCenterChanged={(map: getCenterType) =>
          setCurruntLocation({
            level: map.getLevel(),
            center: {
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            },
          })
        }
      >
        <PlaceDetailMarker />
        <SearchMarker />
        {token ? <PickerMarker /> : null}
      </MapContainer>
    </>
  );
};

export default KakaoMap;
