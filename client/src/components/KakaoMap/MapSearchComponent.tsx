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
    e.preventDefault();
    setValue(e.target.value);
  };

  // 제출한 검색어 state에 담아주는 함수
  const submitKeyword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setKeyword(Value);
  };

  // 검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
  const valueChecker = () => {
    if (Value === "") {
      alert("검색어를 입력해주세요.");
    }
  };

  return (
    <>
      <MapContainer>
        <div className="search-form-container">
          <SearchForm onSubmit={submitKeyword}>
            <FormLabel htmlFor="place">
              <input
                type="text"
                id="movie-title"
                className="form__input"
                name="place"
                onChange={keywordChange}
                placeholder="검색어를 입력해주세요. (ex: 강남 맛집)"
                required
              />
              <div className="btn-box">
                <input
                  className="btn form__submit"
                  type="submit"
                  value="검색"
                  onClick={valueChecker}
                />
              </div>
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
