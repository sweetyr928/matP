/* eslint-disable */

import styled from "styled-components";
import { useState } from "react";
import { postCreate } from "../../utils/API";
import MatEditor from "./MatEditor";
import StarRate from "./StarRate";

const StyledModal = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 1400px;
  height: 800px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10%;
  left: 15%;
  z-index: 999;

  > span.close-btn {
    margin: 5px 0px 0px 1375px;
    cursor: pointer;
    font-size: 30px;
  }
`;

const StyledDiv = styled.div`
  margin: 25px 100px 10px 100px;
  height: auto;
  display: flex;
  flex-direction: column;

  input {
    width: 100%;
    line-height: 25px;
    border: none;
    font-size: 20px;
  }

  .middle_line {
    border: 0;
    width: 100%;
    height: 1.3px;
    background: #b8b8b8;
    margin: 20px 0px 20px 0px;
  }

  input:focus {
    outline: none;
  }

  .ql-container.ql-snow {
    height: 450px;
  }

  .ql-editor p strong {
    font-weight: bold;
  }

  .ql-editor p em {
    font-style: italic;
  }

  .buttons {
    margin: 30px 0px 15px 500px;

    button {
      width: 100px;
      height: 35px;
      background-color: #874356;
      color: #ffffff;
      border: none;
      border-radius: 30px;
      font-size: 15px;
    }

    button:hover {
      font-weight: 700;
    }

    button:first-child {
      margin: 0px 10px 0px 0px;
    }

    .disabled {
      opacity: calc(0.4);
      cursor: not-allowed;
    }
  }
`;

const StyledStarsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0px 0px 0px;
`;

const StyledRatingtxt = styled.div`
  color: #787878;
  font-size: 14px;
  font-weight: 400;
`;

const StyledStar = styled.div`
  display: flex;
  width: 125px;
  padding: 5px 0px 0px 0px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: #989898;
  }

  .yellow {
    color: #fcc419;
  }
`;

const PostCreateModal = ({}: // closeModalHandler,
{
  // closeModalHandler?: React.MouseEventHandler;
}) => {
  const [title, setTitle] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");

  // 단일 post의 thumbnail_url
  let thumbnailUrl: string = "";

  // 별점 기본값 설정
  const [clicked, setClicked] = useState<boolean[]>([false, false, false, false, false]);

  // 항상 별이 총 5개(더미 array)
  const array: Array<number> = [0, 1, 2, 3, 4];

  // 제목 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  /**
   * 클릭한 별의 순서까지를 별점의 총점으로 저장해주는 함수
   * @param index 클릭한 별의 순서
   */
  const handleStarClick = (index: number) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  // '게시' 버튼 누를 시 썸네일 이미지 url(가장 첫번째로 등록된 이미지) 추출
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (htmlContent.indexOf(`<img src="`) > 0) {
      const firstIndex = htmlContent.indexOf(`<img src="`);
      // 서버 연결 후 ` a`로 변경할 것(MatEditor.tsx 참고)
      const secondIndex = htmlContent.indexOf('"></p>', firstIndex);
      thumbnailUrl = htmlContent.slice(firstIndex + 10, secondIndex);
    }
    postSubmit();
  };

  // 썸네일 이미지 url 추출 후 post 등록 요청
  const postSubmit = () => {
    if (title.length > 0 && htmlContent.length > 0) {
      postCreate(
        "rhino",
        "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
        title,
        htmlContent,
        new Date().toLocaleString(),
        clicked.filter(Boolean).length,
        0,
        thumbnailUrl
      );
    }
  };

  // '취소' 버튼 누를시 초기화
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
        <input placeholder="제목을 입력해주세요" value={title} onChange={handleInput}></input>
        <hr className="middle_line" />
        <MatEditor htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
        <StyledStarsWrapper>
          <StyledRatingtxt>평점</StyledRatingtxt>
          <StyledStar>
            {array.map((el, idx) => {
              return (
                <StarRate
                  key={idx}
                  size="50"
                  onClick={() => handleStarClick(el)}
                  className={clicked[el] ? "yellow" : ""}
                />
              );
            })}
          </StyledStar>
        </StyledStarsWrapper>
        <div className="buttons">
          <button
            onClick={handleClick}
            className={
              title.length > 0 &&
              htmlContent.length > 0 &&
              clicked.filter(Boolean).length > 0
                ? ""
                : "disabled"
            }
          >
            작성
          </button>
          <button onClick={handleCancel}>취소</button>
        </div>
      </StyledDiv>
    </StyledModal>
  );
};

export default PostCreateModal;
