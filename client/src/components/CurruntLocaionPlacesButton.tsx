import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CurrentLocaionSearchAxios } from "../api/axiosAPI/places/PlacesAxios";
import { PlaceData } from "../api/axiosAPI/search/placeSearchAxios";
import useAxios from "../hooks/useAxios";
import {
  curruntLocationPlacesState,
  curruntLocationState,
  curruntLocationStatusState,
} from "../store/curruntLocationPlacesAtom";
import { searchResultsState, searchStatusState } from "../store/searchPlaceAtoms";

const CurrentLocaionSearchButton = styled.button`
  @media screen and (max-height: 580px) {
    bottom: -36vh;
  }
  @media screen and (min-width: 801px) {
    &:hover {
      background-color: rgba(198, 93, 123, 1);
    }
  }
  @media screen and (max-width: 800px) {
    top: 200px;
    right: 7px;
    font-size: 1rem;
    background-color: #f8f8f8;
    color: #373737;
    width: 394px;
    height: 28px;
    padding-bottom: 0px;
    border-bottom: 1px solid #dadada;
    border-radius: 0px;
    background-color: rgba(198, 93, 123, 0);
    &:hover {
      color: #707070;
    }
  }
  position: absolute;
  right: -42vw;
  bottom: 10vh;
  font-size: 20px;
  color: #fbfbfb;
  width: 210px;
  height: 50px;
  border: none;
  background-color: rgba(198, 93, 123, 0.75);
  border-radius: 10px;
  cursor: pointer;
`;

const CurruntLocationPlacesButton = () => {
  const curruntLocation = useRecoilValue(curruntLocationState);
  const { center, level } = curruntLocation;
  const { lng, lat } = center;
  const levelMeter = [0, 0.1, 0.25, 0.55, 0.8, 2.0, 3.5];

  const setSearchResults = useSetRecoilState(searchResultsState);
  const setSearchStatus = useSetRecoilState(searchStatusState);
  const setCurruntLocationPlaces = useSetRecoilState(curruntLocationPlacesState);
  const [curruntLocationStatus, setCurruntLocationStatus] = useRecoilState(
    curruntLocationStatusState
  );

  const { axiosData: getCurrentLocaionPlace, responseData: CurrentLocaionPlaceData } = useAxios<
    PlaceData[]
  >(() => CurrentLocaionSearchAxios(lng, lat, levelMeter[level]), [curruntLocationStatus]);

  const CurrentLocaionSearchHandler = () => {
    setSearchStatus("Idle");
    setSearchResults([]);
    getCurrentLocaionPlace();
    setCurruntLocationStatus("Loading");
  };

  useEffect(() => {
    if (curruntLocationStatus === "Loading") {
      setCurruntLocationPlaces(CurrentLocaionPlaceData);
      setCurruntLocationStatus("Success");
    }
  }, [curruntLocationStatus]);

  return (
    <>
      {level < 7 ? (
        <CurrentLocaionSearchButton onClick={CurrentLocaionSearchHandler}>
          현재 위치에서 검색
        </CurrentLocaionSearchButton>
      ) : null}
    </>
  );
};

export default CurruntLocationPlacesButton;
