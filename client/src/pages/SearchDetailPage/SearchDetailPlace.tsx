import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PlaceSearchResult from "../../components/PlaceSearchResult";
import { useEffect, useState } from "react";
import { searchResultsState, searchStatusState } from "../../store/searchPlaceAtoms";
import { useRecoilState } from "recoil";
import useAxios from "../../hooks/useAxios";
import { getSearchPlaceAxios } from "../../api/axiosAPI/search/placeSearchAxios";
import CurruntLocationPlacesButton from "../../components/CurruntLocaionPlacesButton";
import {
  curruntLocationPlacesState,
  curruntLocationStatusState,
} from "../../store/curruntLocationPlacesAtom";

const SearchWrapper = styled.div`
  height: 100%;
  width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 0px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  h1 {
    font-size: 28px;
    font-weight: 500;
    margin-top: 100px;
    margin-bottom: 30px;
  }
  input {
    margin-bottom: 30px;
    width: 80%;
    height: 40px;
    padding: 9px;
    border: 1px solid #adadad;
    outline: none;
    border-radius: 12px;
    color: #373737;
    font-size: 1rem;
  }
`;

const SearchResultPlaceBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const PostPlaceBox = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  button {
    color: #7c7c7c;
    border: none;
    font-size: 16px;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      color: #373737;
    }
  }
`;

const NoneResultMessage = styled.div`
  margin: 3rem 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

interface PlaceData {
  id: number;
  tel: string;
  address: string;
  name: string;
  starAvg: number;
  postCount: number;
  longitude: number;
  latitude: number;
}

const SearchDetailPlace: React.FC = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const {
    axiosData: getSearch,
    responseData: searchData,
    status: searchAxiosStatus,
  } = useAxios<PlaceData[]>(() => getSearchPlaceAxios(keyword), [keyword], true);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const [searchStatus, setSearchStatus] = useRecoilState(searchStatusState);

  useEffect(() => {
    if (searchStatus === "Loading" && searchAxiosStatus === "Success") {
      setSearchResults(searchData);
      setSearchStatus("Success");
    }
  }, [searchStatus, searchAxiosStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && keyword.length !== 0) {
      console.log(keyword);

      setCurruntLocationStatus("Idle");
      setCurruntLocationPlaces([]);
      getSearch();
      setSearchStatus("Loading");
    } else if (event.key === "Enter" && keyword.length === 0) {
      return alert("검색어를 입력해주세요!");
    }
  };

  const [curruntLocationPlaces, setCurruntLocationPlaces] = useRecoilState(
    curruntLocationPlacesState
  );
  const [curruntLocationStatus, setCurruntLocationStatus] = useRecoilState(
    curruntLocationStatusState
  );

  return (
    <SearchWrapper>
      <label htmlFor="input-title">
        <h1>맛플레이스 검색</h1>
      </label>
      <input
        id="input-title"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />

      {curruntLocationPlaces && curruntLocationStatus === "Success" ? (
        <SearchResultPlaceBox>
          {curruntLocationPlaces.map((place) => (
            <PlaceSearchResult key={place.id} place={place} />
          ))}
        </SearchResultPlaceBox>
      ) : null}
      {curruntLocationPlaces.length === 0 && curruntLocationStatus === "Success" ? (
        <NoneResultMessage>검색 결과가 없습니다!</NoneResultMessage>
      ) : null}

      {searchResults && searchStatus === "Success" ? (
        <SearchResultPlaceBox>
          {searchResults.map((place) => (
            <PlaceSearchResult key={place.id} place={place} />
          ))}
        </SearchResultPlaceBox>
      ) : null}
      {searchResults.length === 0 && searchStatus === "Success" ? (
        <NoneResultMessage>검색 결과가 없습니다!</NoneResultMessage>
      ) : null}

      <CurruntLocationPlacesButton />

      <PostPlaceBox>
        <button
          onClick={() => {
            navigate("/newplaces");
          }}
        >
          나만의 맛플레이스가 없다면?
        </button>
      </PostPlaceBox>
    </SearchWrapper>
  );
};
export default SearchDetailPlace;
