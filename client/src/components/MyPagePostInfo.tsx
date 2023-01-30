import styled from "styled-components";
import { getMyData } from "../api/axiosAPI/members/myPageAPI";
import { IMyPostInfo } from "../api/axiosAPI/posts/PostsAxios";
import useAxios from "../hooks/useAxios";
import PostRead from "./PostRead";

const StyledPosts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-gap: 4px;
  margin: 0px 0px 0px 0px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Nothing = styled.span`
  display: flex;
  font-size: 1.5rem;
  margin-top: 10vh;
`;

const MyPagePostInfo = () => {
  const { responseData: memberData } = useAxios(getMyData);
  const { postInfos = [] } = memberData || {};

  const postInfosFiltered = postInfos.filter((item) => {
    item.id !== null;
  });

  return (
    <>
      {postInfosFiltered && postInfosFiltered.length !== 0 ? (
        <StyledPosts>
          {postInfosFiltered.map((post: IMyPostInfo) => (
            <PostRead key={post.id} post={post} />
          ))}
        </StyledPosts>
      ) : (
        <Nothing>작성한 글이 없습니다!</Nothing>
      )}
    </>
  );
};

export default MyPagePostInfo;
