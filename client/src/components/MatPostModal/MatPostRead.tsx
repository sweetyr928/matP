import styled from "styled-components";
import UsePlacesPostsAxios from "../../utils/usePlacesPostsAxios";
import { useEffect, useState } from "react";
import { commentCreate } from "../../utils/API";
import MatPostComment from "./MatPostComment";
import axios from "axios";

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
  z-index: 10000;

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
    width: 1080px;
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

const StyledCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface IComment {
  id: number;
  nickname: string;
  profileimg: string;
  comment: string;
  createdat: string;
}

const PostReadModal = ({
  closeModalHandler,
  selectedPost,
}: {
  closeModalHandler?: React.MouseEventHandler;
  selectedPost: number;
}): JSX.Element => {
  const [comment, setComment] = useState<string>("");
  const [allComment, setAllComment] = useState<IComment[] | null>([]);

  // 단일 post data GET
  const url_posts = `http://localhost:3001/placesposts/2`;
  const { placesPostsData } = UsePlacesPostsAxios(url_posts);

  const {
    // postId = 0,
    nickname = "",
    profileimg = "",
    createdat = "",
    title = "",
    content = "",
    // star = 0,
    // comments = [],
  } = placesPostsData || {};

  useEffect(() => {
    getAllComment();
  }, []);

  // 댓글 실시간 업데이트
  const getAllComment = async () => {
    await axios
      .get<IComment[]>("http://localhost:3001/comments")
      .then((res) => {
        setAllComment(res.data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  // getAllComment 함수 실행 시켜주는 함수(MatPostComment 컴포넌트에 props로 내려줌으로써 comment 수정사항 실시간 업데이트)
  const handleGetAllComment = () => {
    setTimeout(() => getAllComment(), 100);
  };

  // 댓글 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // enter 키 누를 시 댓글 업로드
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && comment.length > 0) {
      commentCreate(
        "rhino",
        "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
        comment,
        new Date().toLocaleString()
      );
      setComment("");
    }
    getAllComment();
  };

  // '게시' 버튼 누를 시 댓글 업로드
  const handleClick = () => {
    if (comment.length > 0) {
      commentCreate(
        "rhino",
        "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
        comment,
        new Date().toLocaleString()
      );
      setComment("");
    }
    getAllComment();
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
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
        <StyledCommentContainer>
          {allComment &&
            allComment
              .slice(0)
              .reverse()
              .map((comment) => (
                <MatPostComment
                  key={comment.id}
                  singleComment={comment}
                  handleGetAllComment={handleGetAllComment}
                />
              ))}
        </StyledCommentContainer>
      </StyledDiv>
    </StyledModal>
  );
};

export default PostReadModal;
