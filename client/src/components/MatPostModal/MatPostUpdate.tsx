/* eslint-disable */

import { useParams } from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  IPlacesPosts,
  IPosts,
  updatePost,
  getPlacesPost,
} from "../../utils/axiosAPI/posts/PostsAxios";
import MatEditor from "./MatEditor";
import StarRate from "./StarRate";
import axios from "axios";
import useAxios from "../../utils/useAxios";
import { useLocation } from "react-router";

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
    margin: 30px 0px 15px 530px;

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
  }

  .disabled {
    opacity: calc(0.4);
    cursor: not-allowed;
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
    color: #989898;
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

const PostUpdateModal = ({}: // closeModalHandler,
{
  // closeModalHandler?: React.MouseEventHandler;
}) => {
  const { id } = useParams();
  // navigate로 컴포넌트 이동 후 받아온 props
  const { state } = useLocation();

  // 기존 데이터 받아오기
  const [newTitle, setNewTitle] = useState<string>(state.title);
  const [htmlContent, setHtmlContent] = useState<string>(state.content);
  const [clicked, setClicked] = useState<boolean[]>(
    new Array(5).fill(true, 0, state.star)
  );
  const [createdAt, setCreatedAt] = useState<string>(state.createdAt);
  // content에 이미지 포함 여부
  const [imageContained, setImageContained] = useState<boolean>(false);
  // 단일 post의 thumbnail_url
  let thumbnailUrl: string = "";
  // 항상 별이 총 5개(더미 array)
  const array: Array<number> = [0, 1, 2, 3, 4];

  useEffect(() => {
    getThumbnailUrl();
    thumbnailUrl.length > 0
      ? setImageContained(true)
      : setImageContained(false);
  }, [htmlContent]);

  const { axiosData } = useAxios(
    () =>
      updatePost(
        newTitle,
        htmlContent,
        createdAt,
        clicked.filter(Boolean).length,
        thumbnailUrl,
        Number(id)
      ),
    [newTitle, htmlContent, clicked, thumbnailUrl],
    true
  );

  // 제목 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  // 썸네일 이미지 url 추출
  const getThumbnailUrl = () => {
    if (htmlContent.indexOf(`<img src="`) > 0) {
      const firstIndex = htmlContent.indexOf(`<img src="`);
      // 서버 연결 후 ` a`로 변경할 것(MatEditor.tsx 참고)
      const secondIndex = htmlContent.indexOf('"></p>', firstIndex);
      thumbnailUrl = htmlContent.slice(firstIndex + 10, secondIndex);
    }
  };

  /**
   * 클릭한 별의 순서까지를 별점의 총점으로 저장해주는 함수
   * @param index 클릭한 별의 순서
   */
  const handleStarClick = (index: number) => {
    getThumbnailUrl();
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    setCreatedAt(new Date().toLocaleString());
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
        <input
          placeholder="제목을 입력해주세요"
          value={newTitle}
          onChange={handleInput}
        ></input>
        <hr className="middle_line" />
        <div className={newTitle.length <= 0 ? "disabled" : ""}>
          <MatEditor
            htmlContent={htmlContent}
            setHtmlContent={setHtmlContent}
          />
        </div>
        <StyledStarsWrapper>
          <StyledRatingtxt>평점</StyledRatingtxt>
          <StyledStar className={imageContained ? "" : "disabled"}>
            {array.map((el, idx) => {
              return (
                <StarRate
                  key={idx}
                  size="50"
                  onClick={() => handleStarClick(el)}
                  className={
                    imageContained ? (clicked[el] ? "yellow" : "") : "disabled"
                  }
                />
              );
            })}
          </StyledStar>
        </StyledStarsWrapper>
        <div className="buttons">
          <button
            onClick={axiosData}
            className={
              newTitle.length > 0 && htmlContent.length > 0 && imageContained
                ? ""
                : "disabled"
            }
          >
            수정
          </button>
        </div>
      </StyledDiv>
    </StyledModal>
  );
};

export default PostUpdateModal;
