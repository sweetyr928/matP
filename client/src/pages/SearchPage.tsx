import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const SearchWrapper = styled.div`
  height: 100%;
  min-width: calc(1340px * 2 / 5 - 63px);
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
    margin-top: 200px;
    margin-bottom: 80px;
  }
`;

const SearchTab = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  border: 1px solid black;
`;

const TabButton = styled.li`
  height: 30px;
  width: 30px;
  list-style: none;
  border: ${(props) =>
    props.id === "focused" ? "3px solid red" : "1px solid black"};
`;

const SearchResultBox = styled.div`
  width: 100%;
  height: 100%;
`;

interface Pickers {
  id: number;
  name: string;
  color: string;
}

const tabs = [
  { index: 1, name: "제목" },
  { index: 2, name: "내용" },
  { index: 3, name: "유저" },
];

const SearchPage: React.FC = () => {
  const [result, setResult] = useState<Pickers[]>([]);
  useEffect(() => {
    try {
      axios.get<Pickers[]>("http://localhost:3001/groups").then((res) => {
        setResult(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <SearchWrapper>
      <h1>검색</h1>
      <SearchTab>
        {tabs.map((el) => (
          <TabButton key={el.index}>{el.name}</TabButton>
        ))}
      </SearchTab>
      <SearchResultBox>
        {result && result.map((list) => <div key={list.id}>결과리스트</div>)}
      </SearchResultBox>
    </SearchWrapper>
  );
};
export default SearchPage;
