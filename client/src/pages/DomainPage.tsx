import styled from "styled-components";
import PostRead from "../components/PostRead";
import { getPagePosts, getPosts } from "../api/axiosAPI/posts/PostsAxios";
import useAxios from "../hooks/useAxios";
import type { IPosts } from "../api/axiosAPI/posts/PostsAxios";
import { useEffect, useState } from "react";
import { getMyData } from "../api/axiosAPI/members/myPageAPI";
import { userInfoState } from "../store/userInfoAtoms";
import { useSetRecoilState } from "recoil";

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
`;

const HeaderContainer = styled.div`
  border-bottom: 1px solid #bbbbbb;
  margin-bottom: 4px;
  h1 {
    margin: 24px 129px;
    font-size: 23px;
    font-weight: 600;
  }
`;

const StyledPosts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-gap: 4px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Domain: React.FC = () => {
  const token = localStorage.getItem("Authorization");
  const setUserInfo = useSetRecoilState(userInfoState);
  const { axiosData: getUserInfo, responseData: memberData } = useAxios(getMyData);
  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  useEffect(() => {
    if (memberData) {
      setUserInfo(memberData);
    }
  }, [memberData]);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [postsReload, setPostsReload] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [postData, setPostData] = useState([]);
  const { responseData: posts } = useAxios(getPosts, [postsReload], false);
  const { axiosData: getPageAxios, responseData: pagePosts } = useAxios(
    () => getPagePosts(page, limit),
    [page],
    false
  );

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const { scrollTop, clientHeight, scrollHeight } = target;
    if (scrollTop + clientHeight >= scrollHeight && hasMore) {
      setPage(page + 1);
      loadData();
      console.log(pagePosts.length);

      if (pagePosts.length < limit) {
        setHasMore(false);
      }
    }
  };

  const loadData = () => {
    getPageAxios();
    setPostData([...postData, ...pagePosts]);
  };

  const getAllPostsReload = () => {
    setPostsReload(!postsReload);
  };

  return (
    <StyledFeed>
      <HeaderContainer>
        <h1>오늘의 맛 Post</h1>
      </HeaderContainer>
      <StyledPosts onScroll={handleScroll}>
        {posts &&
          posts.map((post: IPosts) => (
            <PostRead key={post.id} post={post} getAllPostsReload={getAllPostsReload} />
          ))}
        {postData &&
          postData.map((post: IPosts) => (
            <PostRead key={post.id} post={post} getAllPostsReload={getAllPostsReload} />
          ))}
      </StyledPosts>
    </StyledFeed>
  );
};

export default Domain;
