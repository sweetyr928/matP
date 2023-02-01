import styled from "styled-components";
import { useEffect, useState } from "react";
import { updatePost } from "../../api/axiosAPI/posts/PostsAxios";
import MatEditor from "./MatEditor";
import StarRate from "./StarRate";
import useAxios from "../../hooks/useAxios";

const StyledDiv = styled.div`
  margin: 5vh 10vw;
  height: auto;
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    line-height: 25px;
    border: none;
    font-size: 30px;
    padding-bottom: 5px;
    border-bottom: 1px solid #c8c8c8;
    margin-bottom: 15px;
  }

  input:focus {
    outline: none;
  }

  .ql-container.ql-snow {
    height: 57vh;
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
  bottom: 6.5vh;
  @media screen and (max-height: 750px) {
    bottom: 4.5vh;
  }
  @media screen and (max-height: 560px) {
    bottom: 3vh;
  }
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

// 모달 토글 버튼 연결 (타입 지정)
interface ModalDefaultType {
  onClickToggleModal: () => void;
  id: number;
  state: any;
  placeId: number;
}

const PostUpdateModal = ({ onClickToggleModal, id, state, placeId }: ModalDefaultType) => {
  // 모달 닫기
  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  // 기존 데이터 받아오기
  const [newTitle, setNewTitle] = useState<string>(state.postInfo.title);
  const [htmlContent, setHtmlContent] = useState<string>(state.postInfo.content);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(state.postInfo.thumbnailUrl);
  const [clicked, setClicked] = useState<boolean[]>(
    new Array(5).fill(true, 0, state.postInfo.star)
  );
  // content에 이미지 포함 여부
  const [imageContained, setImageContained] = useState<boolean>(true);
  const [submit, setSubmit] = useState<boolean>(false);

  // 단일 post의 thumbnail_url
  let thumbnail: string = state.postInfo.thumbnailUrl;
  // 항상 별이 총 5개(더미 array)
  const array: Array<number> = [0, 1, 2, 3, 4];

  useEffect(() => {
    getThumbnailUrl();
    thumbnail.length > 0 ? setImageContained(true) : setImageContained(false);
  }, [htmlContent]);

  const { axiosData } = useAxios(
    () =>
      updatePost(newTitle, htmlContent, thumbnailUrl, clicked.filter(Boolean).length, placeId, id),
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
    getThumbnailUrl();
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    setSubmit(!submit);
    axiosData();
    closeModal(e);
  };
  const handleCancel = (e: React.MouseEvent) => {
    closeModal(e);
  };

  return (
    <StyledDiv>
      <input placeholder="제목을 입력해주세요" value={newTitle} onChange={handleInput}></input>
      <div className={newTitle.length <= 0 ? "disabled" : ""}>
        <MatEditor htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
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
                className={imageContained ? (clicked[el] ? "yellow" : "") : "disabled"}
              />
            );
          })}
        </StyledStar>
      </StyledStarsWrapper>
      <div className="buttons">
        <button
          onClick={handleSubmit}
          className={
            newTitle.length > 0 && htmlContent.length > 0 && imageContained ? "" : "disabled"
          }
        >
          수정
        </button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </StyledDiv>
  );
};

export default PostUpdateModal;
