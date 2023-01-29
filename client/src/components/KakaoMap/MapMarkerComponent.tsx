import { useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { searchResultsState, searchStatusState } from "../../store/searchAtoms";

const InfoWindowContainer = styled.div`
  min-width: 150px;
`;

const InfoValue = styled.div`
  padding: 5px;
`;

const MapMarkerComponent = () => {
  const searchResults = useRecoilValue(searchResultsState);
  const searchStatus = useRecoilValue(searchStatusState);

  const [isOpen, setIsOpen] = useState({
    id: -1,
    open: false,
  });

  const markerImg = [
    "https://user-images.githubusercontent.com/94962427/214733548-640ad950-b4ce-42cd-ad04-7b37eb4eaf8f.svg",
    "https://user-images.githubusercontent.com/94962427/214733213-a2c51280-6525-49ed-b60c-5e7e248890f8.svg",
    "https://user-images.githubusercontent.com/94962427/214733289-7588880b-0492-429f-9e7e-8dbc883a88a3.svg",
    "https://user-images.githubusercontent.com/94962427/214733318-efc109a4-439d-4b3a-b17e-ab478ff16102.svg",
  ];
  // image={{
  //   src: markerImg[result.postCount],
  //   size: { width: 25, height: 25 },
  // }}
  return (
    <>
      {searchResults && searchStatus === "Success"
        ? searchResults.map((result) => (
            <MapMarker
              key={result.id}
              position={{ lat: result.latitude, lng: result.longitude }}
              clickable={true}
              onClick={() => setIsOpen({ id: result.id, open: true })}
            >
              {isOpen.open && isOpen.id === result.id && (
                <InfoWindowContainer onClick={() => setIsOpen({ id: -1, open: false })}>
                  <InfoValue>{result.name}</InfoValue>
                  <InfoValue>{result.address}</InfoValue>
                </InfoWindowContainer>
              )}
            </MapMarker>
          ))
        : null}
    </>
  );
};

export default MapMarkerComponent;
