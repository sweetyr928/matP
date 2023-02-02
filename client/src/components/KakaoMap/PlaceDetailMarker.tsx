import { MapMarker } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { placeInfoState, placeInfoStatusState } from "../../store/placeInfoAtoms";

const InfoWindowContainer = styled.div`
  width: 2000%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const PlaceName = styled.div`
  padding: 5px;
  font-size: 16.5px;
  font-weight: 500;
  text-align: center;
  color: #874356;
`;

const PlaceDetailMarker = () => {
  const placeInfo = useRecoilValue(placeInfoState);
  const placeInfoStatus = useRecoilValue(placeInfoStatusState);

  return (
    <>
      {placeInfo && placeInfoStatus === "Success" ? (
        <MapMarker
          key={placeInfo.id}
          position={{ lat: placeInfo.latitude, lng: placeInfo.longitude }}
          clickable={true}
        >
          <InfoWindowContainer>
            <PlaceName>{placeInfo.name}</PlaceName>
          </InfoWindowContainer>
        </MapMarker>
      ) : null}
    </>
  );
};

export default PlaceDetailMarker;
