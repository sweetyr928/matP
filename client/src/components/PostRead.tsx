// 데이터 가져와서 props로 주면 동작하게 만들기
// 사용처: 도메인 페이지(오늘의 맛포스트 목록), 맛플레이스 상세 페이지(관련 맛포스트 목록),
// 검색페이지(제목 및 내용 검색 결과), 맛피플(마이) 페이지 포스트 목록

/* eslint-disable */

import styled from "styled-components";

const PostImg = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
`;

interface PostsProps {
  postId: number;
  likes: number;
  commentcount: number;
  thumbnail_url: string;
}

const PostRead = ({ post }: { post: PostsProps }) => {
  return <PostImg src={post.thumbnail_url} alt="thumbnail" />;
};

export default PostRead;
