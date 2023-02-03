import { useState, useEffect } from "react";
import styled from "styled-components";
import PeopleSearchResult from "../../components/PeopleSearchResult";
import useAxios from "../../hooks/useAxios";
import { getSearchPeople } from "../../api/axiosAPI/search/PeopleSearchAxios";
import { searchStatusState } from "../../store/searchPlaceAtoms";
import { useRecoilState } from "recoil";

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
    height: 50px;
    padding: 9px;
    border: 1px solid #adadad;
    outline: none;
    border-radius: 12px;
    color: #373737;
    font-size: 1rem;
  }
`;

const SearchResultPeoPleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const NoneResultMessage = styled.div`
  margin: 3rem 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

const SearchDetailPeople: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");

  const { axiosData: getSearch, responseData: searchData } = useAxios(
    () => getSearchPeople(nickname),
    [nickname],
    true
  );
  const [searchStatus, setSearchStatus] = useRecoilState(searchStatusState);

  useEffect(() => {
    if (searchStatus === "Loading") {
      setSearchStatus("Success");
    }
  }, [searchStatus, searchData, setSearchStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (nickname.length !== 0) {
      getSearch();
    } else if (event.key === "Enter" && nickname.length === 0) {
      return alert("검색어를 입력해주세요!");
    }
  };

  return (
    <SearchWrapper>
      <label htmlFor="input-title">
        <h1>맛피플 검색</h1>
      </label>
      <input
        id="input-title"
        placeholder="검색어를 입력하세요"
        value={nickname}
        onChange={handleChange}
        onKeyUp={handleKeyPress}
      />
      {searchData ? (
        <SearchResultPeoPleBox>
          {searchData.map((people) => (
            <PeopleSearchResult key={people.id} people={people} />
          ))}
        </SearchResultPeoPleBox>
      ) : null}
      {searchData !== null ? (
        searchData.length === 0 ? (
          <NoneResultMessage>검색 결과가 없습니다!</NoneResultMessage>
        ) : null
      ) : null}
    </SearchWrapper>
  );
};
export default SearchDetailPeople;
