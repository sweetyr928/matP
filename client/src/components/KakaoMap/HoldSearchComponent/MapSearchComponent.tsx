import { useState } from "react";
import styled from "styled-components";
import Map from "./KakaoMap";

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const SearchForm = styled.form`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 999;
`;
const FormLabel = styled.label`
  display: flex;
`;
const SearchInput = styled.input`
  margin: 10px;
  width: 260px;
  font-size: 17px;
  background-color: #fff;
  outline: none;
  border: none;
  border-radius: 5px;
`;

export interface propsType {
  searchKeyword: string;
}

const MapSearchComponent = (): JSX.Element => {
  // 입력 폼 변화 감지하여 입력 값 관리
  const [Value, setValue] = useState("");
  // 제출한 검색어 관리
  const [Keyword, setKeyword] = useState("");

  // 입력 폼 변화 감지하여 입력 값을 state에 담아주는 함수
  const keywordChange = (e: { preventDefault: () => void; target: { value: string } }) => {
    setValue(e.target.value);
  };

  // 제출한 검색어 state에 담아주는 함수
  const submitKeyword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setKeyword(Value);
  };

  // 검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
  const valueChecker = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && Value !== "") {
      submitKeyword(e);
    } else if (e.key === "Enter" && Value === "") {
      alert("검색어를 입력해주세요.");
    }
  };

  return (
    <>
      <MapContainer>
        <div className="search-form-container">
          <SearchForm onSubmit={submitKeyword}>
            <FormLabel htmlFor="place">
              <SearchInput
                type="text"
                name="place"
                onChange={keywordChange}
                onKeyDown={valueChecker}
                placeholder="검색어를 입력하고 Enter를 누르세요."
                required
              />
            </FormLabel>
          </SearchForm>
        </div>
        {/* 제출한 검색어 넘기기 */}
        <Map searchKeyword={Keyword} />
      </MapContainer>
    </>
  );
};

export default MapSearchComponent;
