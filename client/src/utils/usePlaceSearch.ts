// 검색 페이지 생기면 추가 usePlaceSearch(e)로 추가
import { useRecoilState } from "recoil";
import { searchResultsState, searchStatusState } from "../store/searchAtoms";
import axios from "axios";
import { useCallback, useEffect } from "react";

const usePlaceSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const [searchStatus, setSearchStatus] = useRecoilState(searchStatusState);

  const handleSearch = useCallback(async () => {
    setSearchStatus("loading");
    try {
      const response = await axios.get(`도메인/search?query=${e.target.value}`);
      setSearchResults(response.data);
      setSearchStatus("success");
    } catch (error) {
      setSearchStatus("error");
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return { searchResults, searchStatus };
};

export default usePlaceSearch;
