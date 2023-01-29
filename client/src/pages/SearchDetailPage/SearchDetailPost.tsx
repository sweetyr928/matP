import styled from "styled-components";
import { useState } from "react";
import { PostRead } from "../../components";

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

const SearchTab = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  border: none;
  margin-bottom: -6px;
`;

const TabButton = styled.li`
  cursor: pointer;
  font-size: 18px;
  height: 37px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  list-style: none;
  border-bottom: ${(props) =>
    props.id === "focused" ? "2px solid #373737" : "1px solid #adadad"};
  &:hover {
    background-color: rgb(236, 236, 236);
  }
`;

const SearchResultBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-gap: 4px;
  margin: 0px 0px 0px 0px;
`;

const SearchDetailPost: React.FC = () => {
  const [currentMenu, setCurrentMenu] = useState(0);

  const selectMenuHandler = (idx: number) => {
    setCurrentMenu(idx);
  };

  const tabs = [
    { index: 1, name: "제목" },
    { index: 2, name: "내용" },
  ];

  const result = [
    {
      id: 1,
      likes: 24,
      commentcount: 2,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvWN6FLgG2lpiFwoT3zNUq9FMCyZiyaXXbA&usqp=CAU",
      title: "수정수정수정수정",
      content: "콘텐츠수정콘텐츠수정콘텐츠수정콘텐츠수정",
      createdAt: "2023-01-19T10:55:37",
      modifiedAt: "2023-01-19T10:55:49",
      star: 3,
      memberId: 2,
      placeId: 1,
    },
    {
      id: 2,
      likes: 3,
      commentcount: 4,
      thumbnailUrl:
        "https://i.pinimg.com/550x/41/90/b4/4190b4283d11cf6934251698fa1b2e64.jpg",
      title: "수정수정수정수정",
      content: "콘텐츠수정콘텐츠수정콘텐츠수정콘텐츠수정",
      createdAt: "2023-01-19T10:55:37",
      modifiedAt: "2023-01-19T10:55:49",
      star: 3,
      memberId: 2,
      placeId: 1,
    },
    {
      id: 3,
      likes: 34,
      commentcount: 4,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDuqH-2EX6uJe9UIR8lRz5ql8dSwDl1BJAzrxUNdEut8GVP6RtZVdWk4IwCIst4Jk-Rpg&usqp=CAU",
      title: "수정수정수정수정",
      content: "콘텐츠수정콘텐츠수정콘텐츠수정콘텐츠수정",
      createdAt: "2023-01-19T10:55:37",
      modifiedAt: "2023-01-19T10:55:49",
      star: 3,
      memberId: 2,
      placeId: 1,
    },
    {
      id: 4,
      likes: 5,
      commentcount: 43,
      thumbnailUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh-tTdRm7D2U_IVczw3DxrexUbDL3CLOXEKjf1fNCa2dEYnGDSfG3WhrvWQVFRhcMg05c&usqp=CAU",
      title: "수정수정수정수정",
      content: "콘텐츠수정콘텐츠수정콘텐츠수정콘텐츠수정",
      createdAt: "2023-01-19T10:55:37",
      modifiedAt: "2023-01-19T10:55:49",
      star: 3,
      memberId: 2,
      placeId: 1,
    },
  ];

  return (
    <SearchWrapper>
      <label htmlFor="input-title">
        <h1>맛포스트 검색</h1>
      </label>
      <input id="input-title" placeholder="검색어를 입력하세요" />

      <SearchTab>
        {tabs.map((el, idx) => (
          <TabButton
            key={el.index}
            id={idx === currentMenu ? "focused" : ""}
            onClick={() => selectMenuHandler(idx)}
          >
            {el.name}
          </TabButton>
        ))}
      </SearchTab>
      {result ? (
        <SearchResultBox>
          {result.map((post) => (
            <PostRead key={post.id} post={post} />
          ))}
        </SearchResultBox>
      ) : null}
    </SearchWrapper>
  );
};
export default SearchDetailPost;
