import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CurrentLocaionSearchAxios } from "../api/axiosAPI/places/PlacesAxios";
import { PlaceData } from "../api/axiosAPI/search/placeSearchAxios";
import useAxios from "../hooks/useAxios";
import {
  curruntLocationPlacesState,
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
  font-size: 1.57rem;
  color: #fbfbfb;
  width: 200px;
  height: 50px;
  border: none;
  background-color: rgba(198, 93, 123, 0.85);
  border-radius: 10px;
  cursor: pointer;
`;

const CurruntLocationPlacesButton = () => {
  const { axiosData: getCurrentLocaionPlace, responseData: CurrentLocaionPlaceData } = useAxios<
    PlaceData[]
  >(() => CurrentLocaionSearchAxios(), []);

  const setCurruntLocationPlaces = useSetRecoilState(curruntLocationPlacesState);
  const [curruntLocationStatus, setCurruntLocationStatus] = useRecoilState(
    curruntLocationStatusState
  );

  const setSearchResults = useSetRecoilState(searchResultsState);
  const setSearchStatus = useSetRecoilState(searchStatusState);

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
    <CurrentLocaionSearchButton onClick={CurrentLocaionSearchHandler}>
      현재 위치에서 검색
    </CurrentLocaionSearchButton>
  );
};

export default CurruntLocationPlacesButton;
