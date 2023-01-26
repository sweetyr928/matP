/* eslint-disable */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { createPost } from "../../utils/axiosAPI/posts/PostsAxios";
import MatEditor from "./MatEditor";
import StarRate from "./StarRate";
import useAxios from "../../utils/useAxios";

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
  z-index: 1010;

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

  .disabled {
    cursor: not-allowed;
    opacity: calc(0.4);
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

const StyledBackDrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

// 모달 토글 버튼 연결 (타입 지정)
interface ModalDefaultType {
  onClickToggleModal: () => void;
}

const PostCreateModal = ({ onClickToggleModal }: ModalDefaultType) => {
  const [title, setTitle] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");

  // 모달 닫기
  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  // 단일 post의 thumbnail_url
  let thumbnailUrl: string = "";

  // 별점 기본값 설정
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [imageContained, setImageContained] = useState<boolean>(false);

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
      createPost(
        "rhino",
        "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
        title,
        htmlContent,
        createdAt,
        clicked.filter(Boolean).length,
        0,
        thumbnailUrl
      ),
    [createdAt],
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
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    setCreatedAt(new Date().toLocaleString());
  };

  // '취소' 버튼 누를시 초기화
  const handleCancel = (e: React.MouseEvent) => {
    setHtmlContent("");
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
            onClick={axiosData}
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
