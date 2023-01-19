import styled from "styled-components";
import PeopleSearchResult from "../../components/PeopleSearchResult";

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
    margin-top: 120px;
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
`;

const SearchDetailPeople: React.FC = () => {
  const peoples = [
    {
      userId: 1,
      name: "윤뿔소",
      followers: 200,
      memo: "맛있다!",
      thumbnail_url:
        "https://user-images.githubusercontent.com/94962427/211693723-e10b0b7d-95ed-4918-b450-f952168bca3a.jpeg",
    },
    {
      userId: 2,
      name: "윤뿔소",
      followers: 200,
      memo: "맛있다!",
      thumbnail_url:
        "https://user-images.githubusercontent.com/94962427/211693723-e10b0b7d-95ed-4918-b450-f952168bca3a.jpeg",
    },
    {
      userId: 3,
      name: "윤뿔소",
      followers: 200,
      memo: "맛있다!",
      thumbnail_url:
        "https://user-images.githubusercontent.com/94962427/211693723-e10b0b7d-95ed-4918-b450-f952168bca3a.jpeg",
    },
  ];

  return (
    <SearchWrapper>
      <label htmlFor="input-title">
        <h1>맛피플 검색</h1>
      </label>
      <input id="input-title" placeholder="검색어를 입력하세요" />

      {peoples ? (
        <SearchResultPeoPleBox>
          {peoples.map((people) => (
            <PeopleSearchResult key={people.userId} people={people} />
          ))}
        </SearchResultPeoPleBox>
      ) : null}
    </SearchWrapper>
  );
};
export default SearchDetailPeople;
