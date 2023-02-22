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
  width: calc(1340px * 2 / 5 - 63px);
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
  width: 100%;
  border-bottom: 1px solid #bbbbbb;
  margin-bottom: 4px;
  h1 {
    width: 100%;
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
  // 로그인 시 로컬스토리지에서 토큰 가져와 로그인한 유저 정보 전역 상태로 관리
  const token = localStorage.getItem("Authorization");
  const setUserInfo = useSetRecoilState(userInfoState);
  const { axiosData: getUserInfo, responseData: memberData } = useAxios(
    getMyData,
    [token],
    true
  );

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

  const [postsReload, setPostsReload] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(24);
  const [postData, setPostData] = useState([]);

  // 첫 24개 posts GET
  const { responseData: posts } = useAxios(getPosts, [postsReload], false);
  // 첫 24개 posts 제외 나머지 posts GET(무한스크롤 위해)
  const { axiosData: getPageAxios, responseData: pagePosts } = useAxios(
    () => getPagePosts(page, limit),
    [page, postData],
    false
  );

  // 무한스크롤(첫 24개 posts 제외 나머지 posts GET)
  const loadData = () => {
    getPageAxios();
    setPostData([...postData, ...pagePosts]);
  };

  // 무한스크롤 로직
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const { scrollTop, clientHeight, scrollHeight } = target;
    if (scrollTop + clientHeight >= scrollHeight && hasMore) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      setPage(page + 1);
      loadData();
      if (pagePosts.length < limit) {
        setHasMore(false);
      }
    }
  };

  // posts reload 여부 체크
  const getAllPostsReload = () => {
    setPostsReload(!postsReload);
  };

  return (
    <StyledFeed>
      <HeaderContainer>
        <h1>오늘의 맛 Post</h1>
      </HeaderContainer>
      <StyledPosts onScroll={handleScroll}>
        {/* 처음에 렌더링되는 24개의 맛포스트 */}
        {posts &&
          posts.map((post: IPosts) => (
            <PostRead
              key={post.id}
              post={post}
              getAllPostsReload={getAllPostsReload}
            />
          ))}
        {postData &&
          postData.map((post: IPosts) => (
            <PostRead
              key={post.id}
              post={post}
              getAllPostsReload={getAllPostsReload}
            />
          ))}
      </StyledPosts>
    </StyledFeed>
  );
};

export default Domain;
