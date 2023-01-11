/* eslint-disable */

import styled from "styled-components";
import UsePlacesPostsAxios from "../../utils/usePlacesPostsAxios";
import { useState } from "react";
import { commentCreate } from "../../utils/API";
import UseCommentsAxios from "../../utils/useCommentsAxios";
import MatPostComment from "./MatPostComment";

const StyledModal = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 1400px;
  height: 800px;
  display: flex;
  flex-direction: column;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 999;

  > span.close-btn {
    margin: 5px 0px 0px 1375px;
    cursor: pointer;
    font-size: 30px;
  }
`;

const StyledDiv = styled.div`
  margin: 25px 100px 10px 100px;
  display: flex;
  flex-direction: column;
`;

const StyledContentWrapper = styled.div`
  margin: 10px 0px 0px 0px;
  display: flex;
  flex-direction: column;

  .post_title {
    font-size: 40px;
    margin: 0px 0px 20px 0px;
  }
`;

const StyledMid = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 30px 0px;

  button {
    border: none;
    background-color: transparent;
    color: #727272;
  }

  button:hover {
    font-weight: 700;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0px 10px 0px 0px;
  }

  .post_nickname {
    font-size: 15px;
    margin: 0px 10px 0px 0px;
  }

  .post_createdAt {
    font-size: 15px;
  }
`;

const StyledContent = styled.div`
  margin: 0px 0px 30px 0px;
`;

const StyledComment = styled.div`
  margin: 10px 0px 30px 0px;
  display: flex;
  justify-content: space-between;

  input {
    min-width: 1080px;
    height: 30px;
    border: none;
    border-bottom: 1px solid;
    font-size: 15px;
  }

  input:focus {
    outline: none;
  }

  button {
    width: 100px;
    background-color: #874356;
    color: #ffffff;
    border: none;
    border-radius: 30px;
    font-size: 15px;
  }

  button:hover {
    font-weight: 700;
  }
`;

const PostReadModal = ({
  closeModalHandler,
  selectedPost,
}: {
  closeModalHandler?: React.MouseEventHandler;
  selectedPost: number;
}): JSX.Element => {
  const [comment, setComment] = useState<string>("");

  const url_posts = `http://localhost:3001/placesposts`;
  const { placesPostsData } = UsePlacesPostsAxios(url_posts);

  const url_comments = `http://localhost:3001/comments`;
  const { commentsData } = UseCommentsAxios(url_comments);

  // console.log(commentsData);

  const {
    postId = 0,
    nickname = "",
    profileimg = "",
    createdat = "",
    title = "",
    star = 0,
    comments = [],
  } = placesPostsData || {};

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      commentCreate(
        "rhino",
        "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
        comment,
        new Date().toLocaleString()
      );
      setComment("");
      e.preventDefault();
    }
  };

  const handleClick = (e: any) => {
    commentCreate(
      "rhino",
      "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
      comment,
      new Date().toLocaleString()
    );
    setComment("");
    e.preventDefault();
  };

  return (
    <StyledModal>
      <span
        role="presentation"
        onClick={closeModalHandler}
        className="close-btn"
      >
        &times;
      </span>
      <StyledDiv>
        <StyledContentWrapper>
          <div className="post_title">{title}</div>
          <StyledMid>
            <StyledInfo>
              <img src={profileimg} alt="profileImg"></img>
              <div className="post_nickname">{nickname}</div>
              <div className="post_createdAt">{createdat}</div>
            </StyledInfo>
            <div>
              <button>수정</button>
              <button>삭제</button>
              <button>url 복사</button>
            </div>
          </StyledMid>
          <StyledContent>
            <div>content</div>
          </StyledContent>
        </StyledContentWrapper>
        <StyledComment>
          <input
            placeholder="댓글을 입력해주세요"
            onChange={handleInput}
            value={comment}
            onKeyUp={handleKeyUp}
          ></input>
          <button onClick={handleClick}>게시</button>
        </StyledComment>
        <MatPostComment></MatPostComment>
      </StyledDiv>
    </StyledModal>
  );
};

export default PostReadModal;
