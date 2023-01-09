import styled from "styled-components";

const FeedContainer = styled.div`
  height: 100%;
  /* height: 100vh; */
  min-width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding-left: 63px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
`;

const Domain = () => {
  return <FeedContainer>오늘의 맛post</FeedContainer>;
};

export default Domain;
