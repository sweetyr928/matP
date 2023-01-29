import styled from "styled-components";
import PostRead from "../components/PostRead";
import { getPosts } from "../api/axiosAPI/posts/PostsAxios";
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
  const token = localStorage.getItem("Authorization");
  const setUserInfo = useSetRecoilState(userInfoState);
  const { axiosData: getUserInfo, responseData: memberData } =
    useAxios(getMyData);
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
  const { axiosData: getAllPosts, responseData: posts } = useAxios(
    getPosts,
    [],
    false
  );
  const [allPosts, setAllPosts] = useState<IPosts[]>(posts);

  useEffect(() => {
    console.log(2);
    getAllPosts();
    console.log(posts);
    setAllPosts(posts);
  }, [postsReload]);

  const getAllPostsReload = () => {
    console.log(1);
    setPostsReload(!postsReload);
  };

  return (
    <StyledFeed>
      <h1>오늘의 맛 Post</h1>
      <StyledPosts>
        {posts &&
          posts.map((post: IPosts) => (
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
