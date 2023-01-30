import styled from "styled-components";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

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
    margin-top: 10px;
    margin-bottom: 80px;
  }
`;

const SearchTab = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  a {
    text-decoration: none;
    color: #373737;
  }
`;

const TabButton = styled.li`
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 95px;
  padding: 0 30px;
  border-bottom: 1px solid #adadad;
  list-style: none;
  .info {
    margin-top: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #505050;
  }
  .icon {
    font-size: 55px;
    color: #505050;
    &:hover {
      filter: brightness(0.6);
    }
  }

  &:hover {
    background-color: #efefef;
    font-weight: 700;
  }
`;

const lists = [
  {
    index: 1,
    name: "맛포스트",
    info: "어제 스쳐 지나간 맛포스트가 아른거릴 때 클릭!",
    icon: <ArticleIcon className="icon" color="inherit" />,
  },
  {
    index: 2,
    name: "맛플레이스",
    info: "화제의 그 맛플레이스를 찾고 싶을 때 클릭!",
    icon: <RestaurantIcon className="icon" color="inherit" />,
  },
  {
    index: 3,
    name: "맛피플",
    info: "소문으로만 듣던 맛피플을 찾고 싶을 때 클릭!",
    icon: <SentimentSatisfiedAltIcon className="icon" color="inherit" />,
  },
];

const SearchPage: React.FC = () => {
  return (
    <SearchWrapper>
      <h1>검색하고 싶은 주제를 골라주세요!</h1>
      <SearchTab>
        {lists.map((el) => (
          <Link to={`/search/${el.name}`} key={el.index}>
            <TabButton>
              <div className="text-box">
                <div className="name">{el.name}</div>
                <div className="info">{el.info}</div>
              </div>
              <div className="icon">{el.icon}</div>
            </TabButton>
          </Link>
        ))}
      </SearchTab>
    </SearchWrapper>
  );
};
export default SearchPage;
