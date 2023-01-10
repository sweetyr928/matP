/* eslint-disable */

import styled from "styled-components";
import PostRead from "../components/PostRead";
import axios from "axios";
import { useEffect, useState } from "react";

const FeedContainer = styled.div`
  height: 92%;
  /* height: 100vh; */
  min-width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 0px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;

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

interface Post {
  postId: number;
  likes: number;
  commentcount: number;
  thumbnail_url: string;
}

const Domain: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      axios.get<Post[]>("http://localhost:3001/posts").then((res) => {
        setPosts(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <FeedContainer>
      <p>오늘의 맛 Post</p>
      <PostsContainer>
        {posts &&
          posts.map((post) => <PostRead key={post.postId} post={post} />)}
      </PostsContainer>
    </FeedContainer>
  );
};

export default Domain;
