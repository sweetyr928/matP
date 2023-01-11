/* eslint-disable */

import styled from "styled-components";
import PostRead from "../components/PostRead";
import axios from "axios";
import { useEffect, useState } from "react";
import UsePostsAxios from "../utils/usePostsAxios";

const FeedContainer = styled.div`
  height: 100%;
  /* height: 100vh; */
  min-width: calc(1340px * 2 / 5 - 63px);
  z-index: 990;
  padding: 0px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  margin: 56px 0px 0px 0px;

  p {
    margin: 20px 70px 20px 70px;
    font-size: 23px;
    font-weight: 600;
  }
`;

const PostsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-gap: 4px;
  margin: 0px 0px 0px 0px;
`;

const Domain: React.FC = () => {
  const url = "http://localhost:3001/posts";
  const { postsData } = UsePostsAxios(url);

  return (
    <FeedContainer>
      <p>오늘의 맛 Post</p>
      <PostsContainer>
        {postsData &&
          postsData.map((post) => <PostRead key={post.postId} post={post} />)}
      </PostsContainer>
    </FeedContainer>
  );
};

export default Domain;
