import styled from "styled-components";
import { Header } from "../components";

const FeedContainer = styled.div`
  /* height: 100%; */
  height: 100vh;
  min-width: calc(1200px * 2 / 5 - 63px);
  z-index: 997;
  margin-left: 63px;
  margin-right: 0px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
`;

const Domain = () => {
  return (
    <FeedContainer>
      <Header />
      오늘의 맛 Post
    </FeedContainer>
  );
};

export default Domain;
