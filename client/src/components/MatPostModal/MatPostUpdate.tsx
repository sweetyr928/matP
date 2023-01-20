/* eslint-disable */

import { useParams } from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  IPlacesPosts,
  IPosts,
  updatePost,
} from "../../utils/axiosAPI/posts/PostsAxios";
import MatEditor from "./MatEditor";
import StarRate from "./StarRate";
import axios from "axios";
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

  // 기존 데이터 받아오기
  const [newTitle, setNewTitle] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [createdAt, setCreatedAt] = useState<string>("");

  // 단일 post의 thumbnail_url
  let thumbnailUrl: string = "";

  // 항상 별이 총 5개(더미 array)
  const array: Array<number> = [0, 1, 2, 3, 4];

  /**
   * useEffect 내에서 props로 받아온 id 값을 가지는 Post의 데이터 정보를 get 요청해서 가져오지 않으면 수정 시 이전 데이터를 가져올 수 없게 되어
   * 해당 컴포넌트가 랜더링 될 때 get 요청을 받아오는 방식으로 처리함
   * TODO : 이것을 해결할 수 있는 방안이 있는지?
   */
  useEffect(() => {
    try {
      axios
        .get<IPlacesPosts>(`http://localhost:3001/placesposts/${id}`)
        .then((res) => {
          setNewTitle(res.data.title);
          setHtmlContent(res.data.content);
          setClicked(new Array(5).fill(true, 0, res.data.star));
          thumbnailUrl = res.data.thumbnailUrl;
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

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
    [createdAt],
    true
  );

  // 제목 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

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
            onClick={axiosData}
            className={
              newTitle.length > 0 && htmlContent.length > 0 ? "" : "disabled"
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
