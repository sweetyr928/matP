/* eslint-disable */

import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import MatEditor from "./MatEditor";

const StyledModal = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 1400px;
  height: 800px;
  display: flex;
  flex-direction: column;
  position: fixed;
  margin: -17px auto;
  left: 0;
  right: 0;
  z-index: 999;

  > span.close-btn {
    margin: 5px 0px 0px 1375px;
    cursor: pointer;
    font-size: 30px;
  }

  .buttons {
    margin: 40px 0px 0px 150px;
  }
`;

const StyledDiv = styled.div`
  margin: 25px 100px 10px 100px;
  display: flex;
  flex-direction: column;

  .ql-editor p strong {
    font-weight: bold;
  }

  .ql-editor p em {
    font-style: italic;
  }
`;

const PostCreateModal = ({}: // closeModalHandler,
{
  // closeModalHandler?: React.MouseEventHandler;
}): JSX.Element => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  // 단일 post data GET
  const url_posts = `http://localhost:3001/placesposts`;

  // 댓글 input 창
  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setComment(e.target.value);
  // };

  // '게시' 버튼 누를 시 업로드
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(htmlContent);
    // if (comment.length > 0) {
    //   commentCreate(
    //     "rhino",
    //     "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
    //     comment,
    //     new Date().toLocaleString()
    //   );
  };

  const handleCancel = () => {
    setHtmlContent("");
  };

  return (
    <StyledModal>
      <span
        role="presentation"
        // onClick={closeModalHandler}
        className="close-btn"
      >
        &times;
      </span>
      <StyledDiv>
        <input placeholder="제목을 입력해주세요"></input>
        <MatEditor htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
      </StyledDiv>
      <div className="buttons">
        <button onClick={handleClick}>작성</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </StyledModal>
  );
};

export default PostCreateModal;
