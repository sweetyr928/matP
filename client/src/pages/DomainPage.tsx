import styled from "styled-components";
import PostRead from "../components/PostRead";
import { getPosts } from "../api/axiosAPI/posts/PostsAxios";
import useAxios from "../hooks/useAxios";
import type { IPosts } from "../api/axiosAPI/posts/PostsAxios";
import { useSearchParams } from "react-router-dom";

const StyledFeed = styled.div`
  height: 100%;
  /* height: 100vh; */
  min-width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 65px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;

  h1 {
    margin: 20px 70px 20px 70px;
    font-size: 23px;
    font-weight: 600;
  }
`;

const StyledPosts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-gap: 4px;
  margin: 0px 0px 0px 0px;
`;

const Domain: React.FC = () => {
  const [searchParams] = useSearchParams();
  const Authorization = searchParams.get("access_token") || "";
  if (Authorization) {
    localStorage.setItem("Authorization", Authorization);
  }

  const { responseData } = useAxios(getPosts, [], false);

  return (
    <StyledFeed>
      <h1>오늘의 맛 Post</h1>
      <StyledPosts>
        {responseData &&
          responseData.map((post: IPosts) => (
            <PostRead key={post.id} post={post} />
          ))}
      </StyledPosts>
    </StyledFeed>
  );
};

export default Domain;
