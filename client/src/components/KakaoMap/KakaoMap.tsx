/* eslint-disable */
import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { placeInfoState, placeInfoStatusState } from "../../store/placeInfoAtoms";
import PickerMarker from "./PIckerMarker";
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
  const placeInfoStatus = useRecoilValue(placeInfoStatusState);
  const { latitude, longitude } = useRecoilValue(placeInfoState);

  const [centerMove, setCenterMove] = useState({
    lat: 37.55867270361961,
    lng: 126.86212630618877,
  });

  const [centerInfo, setCenterInfo] = useState({ level: 0, center: { lat: null, lng: null } });

  useEffect(() => {
    if (placeInfoStatus === "Success") {
      console.log(latitude, longitude);

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
          lat: centerMove.lat || 37.55867270361961,
          lng: centerMove.lng || 126.86212630618877,
        }}
        level={9}
        isPanto={true}
        onCenterChanged={(map: getCenterType) =>
          setCenterInfo({
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
        <PickerMarker />
      </MapContainer>
    </>
  );
};

export default KakaoMap;
