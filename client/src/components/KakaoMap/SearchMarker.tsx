import { useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { searchResultsState, searchStatusState } from "../../store/searchPlaceAtoms";
import { useNavigate } from "react-router";

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

const SearchMarker = () => {
  const navigate = useNavigate();
  const searchResults = useRecoilValue(searchResultsState);
  const searchStatus = useRecoilValue(searchStatusState);

  const [isVisible, setIsVisible] = useState({
    id: -1,
    isVisible: false,
  });

  const clickHandler = (id: number) => {
    navigate(`/places/${id}`);
  };

  return (
    <>
      {searchResults && searchStatus === "Success"
        ? searchResults.map((result) => (
            <MapMarker
              key={result.id}
              position={{ lat: result.latitude, lng: result.longitude }}
              clickable={true}
              onMouseOver={() => setIsVisible({ id: result.id, isVisible: true })}
              onMouseOut={() => setIsVisible({ id: -1, isVisible: false })}
              onClick={() => clickHandler(result.id)}
            >
              {isVisible.isVisible && isVisible.id === result.id && (
                <InfoWindowContainer>
                  <PlaceName>{result.name}</PlaceName>
                </InfoWindowContainer>
              )}
            </MapMarker>
          ))
        : null}
    </>
  );
};

export default SearchMarker;
