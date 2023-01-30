/* eslint-disable */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { createPost } from "../../api/axiosAPI/posts/PostsAxios";
import MatEditor from "./MatEditor";
import StarRate from "./StarRate";
import useAxios from "../../hooks/useAxios";

const StyledModal = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 80vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 5vh;
  left: 10vw;
  z-index: 10000;

  > span.close-btn {
    position: absolute;
    top: 1vh;
    right: 1vw;
    cursor: pointer;
    font-size: 30px;
  }
`;

const StyledDiv = styled.div`
  margin: 7vh 10vw;
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
  .disabled {
    cursor: not-allowed;
    opacity: calc(0.4);
  }
  .ql-container.ql-snow {
    height: 55vh;
    @media screen and (max-height: 720px) {
      height: 50vh;
    }
    @media screen and (max-height: 560px) {
      height: 45vh;
    }
  }
  .ql-editor p strong {
    font-weight: bold;
  }
  .ql-editor p em {
    font-style: italic;
  }
  .buttons {
    position: absolute;
    bottom: 3vh;
    left: 33vw;
    @media screen and (max-width: 1080px) {
      left: 35vw;
    }
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
      font-weight: 550;
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
  position: absolute;
  bottom: 4vh;
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

// 모달 토글 버튼 연결 (타입 지정)
interface ModalDefaultType {
  onClickToggleModal: () => void;
  placeId: number;
  dataReloadHandler: () => void;
}

const PostCreateModal = ({
  onClickToggleModal,
  placeId,
  dataReloadHandler,
}: ModalDefaultType) => {
  // 모달 닫기
  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      dataReloadHandler();
      onClickToggleModal();
    }
  };

  const [title, setTitle] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  // 별점 기본값 설정
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [imageContained, setImageContained] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);

  let thumbnail: string = "";

  // 항상 별이 총 5개(더미 array)
  const array: Array<number> = [0, 1, 2, 3, 4];

  useEffect(() => {
    getThumbnailUrl();
    thumbnail.length > 0 ? setImageContained(true) : setImageContained(false);
  }, [htmlContent]);

  const { axiosData } = useAxios(
    () =>
      createPost(
        title,
        htmlContent,
        thumbnailUrl,
        clicked.filter(Boolean).length,
        placeId
      ),
    [title, htmlContent, thumbnailUrl, clicked, submit],
    true
  );

  // 제목 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 썸네일 이미지 추출
  const getThumbnailUrl = () => {
    if (htmlContent.indexOf(`<img src="`) > 0) {
      const firstIndex = htmlContent.indexOf(`<img src="`);
      const secondIndex = htmlContent.indexOf('" a', firstIndex);
      thumbnail = htmlContent.slice(firstIndex + 10, secondIndex);
      setThumbnailUrl(thumbnail);
    }
  };

  /**
   * 클릭한 별의 순서까지를 별점의 총점으로 저장해주는 함수
   * @param index 클릭한 별의 순서
   */
  const handleStarClick = (index: number) => {
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    if (
      title.length > 0 &&
      htmlContent.length > 0 &&
      imageContained &&
      clicked.filter(Boolean).length > 0
    ) {
      setSubmit(!submit);
      axiosData();
      closeModal(e);
    } else {
      alert("필수 입력 값들을 입력해주세요!");
    }
  };

  // '취소' 버튼 누를시 초기화
  const handleCancel = (e: React.MouseEvent) => {
    closeModal(e);
  };

  return (
    <StyledModal>
      <span role="presentation" onClick={closeModal} className="close-btn">
        &times;
      </span>
      <StyledDiv>
        <input
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={handleInput}
        ></input>
        <hr className="middle_line" />
        <div className={title.length <= 0 ? "disabled" : ""}>
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
            onClick={handleSubmit}
            className={
              title.length > 0 &&
              htmlContent.length > 0 &&
              imageContained &&
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
