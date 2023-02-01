/* eslint-disable */
import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { curruntLocationState } from "../../store/curruntLocationPlacesAtom";
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
  const [curruntLocation, setCurruntLocation] = useRecoilState(curruntLocationState);

  const [centerMove, setCenterMove] = useState({
    lat: 37.566206959342374,
    lng: 126.8997819104286,
  });

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

  useEffect(() => {
    console.log(curruntLocation.center.lat, curruntLocation.center.lng);
  }, [curruntLocation.center.lat, curruntLocation.center.lng]);

  return (
    <>
      <MapContainer
        center={{
          lat: centerMove.lat || 37.566206959342374,
          lng: centerMove.lng || 126.8997819104286,
        }}
        level={8}
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
        <PickerMarker />
      </MapContainer>
    </>
  );
};

export default KakaoMap;
