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

const MyPagePostInfo = () => {
  const { responseData: memberData } = useAxios(getMyData);
  const { postInfos } = memberData || {};

  return (
    <StyledPosts>
      {postInfos && postInfos.map((post: IMyPostInfo) => <PostRead key={post.id} post={post} />)}
    </StyledPosts>
  );
};

export default MyPagePostInfo;
