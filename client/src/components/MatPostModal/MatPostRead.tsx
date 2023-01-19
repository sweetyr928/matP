import styled from "styled-components";
import UsePlacesPostsAxios from "../../utils/usePlacesPostsAxios";
import { useEffect, useState } from "react";
import { commentCreate, postDelete } from "../../utils/API";
import MatPostComment from "./MatPostComment";
import axios from "axios";
import StarRate from "./StarRate";
import { useNavigate } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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
  margin: 0px 100px 10px 100px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  .post_middle_line {
    border: 0;
    width: 100%;
    height: 1.3px;
    background: #b8b8b8;
    margin: 5px 0px 10px 0px;
  }
`;

const StyledContentWrapper = styled.div`
  margin: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;

  .post_title {
    font-size: 40px;
    margin: 0px 0px 15px 0px;
  }
`;

const StyledMid = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 15px 0px;

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
  margin: 0px 0px 5px 0px;
  padding: 1px 0px 0px 0px;
  min-height: 270px;
  max-height: 270px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledStarsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledStar = styled.div`
  display: flex;
  width: 125px;
  padding: 5px 0px 0px 0px;

  & svg {
    color: #989898;
  }

  .yellow {
    color: #fcc419;
  }
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
    color: #373737;
    font-size: 1rem;
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
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // post data GET
  const url_posts = `http://localhost:3001/placesposts/${selectedPost}`;
  const { placesPostsData } = UsePlacesPostsAxios(url_posts);

  const {
    id = 0,
    nickname = "",
    profileimg = "",
    createdat = "",
    title = "",
    content = "",
    star = 0,
    likes = 0,
    // comments = [],
  } = placesPostsData || {};

  const navigate = useNavigate();

  // 별점 불러오기
  const clicked = new Array(5).fill(true, 0, star);

  // 항상 별이 총 5개(더미 array)
  const array: Array<number> = [0, 1, 2, 3, 4];

  useEffect(() => {
    getAllComment();
    /**
     * TODO: 해당 유저가 이 post에 '좋아요' 했는지 식별하기 위해 /places/post/post-id/likes로 get 요청 보낸 후 isLiked 값 변경 필요
     */
  }, []);

  // '수정' 버튼 클릭 시 PostUpdateModal로 이동
  const handleEdit = () => {
    navigate(`/edit/${selectedPost}`);
  };

  /**
   * TODO: 서버 연결 시, setAllComment(res.data)를 통해 전체 댓글 실시간 업데이트 구현
   */
  const handleDelete = async () => {
    await postDelete(id);
    window.location.replace("/");
  };

  // '하트' 이모지 클릭 시 like / default 상태로 바뀜
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // 댓글 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  /**
   * TODO: 서버 연결 시, 해당 로직 삭제 필요
   */
  const getAllComment = async () => {
    try {
      const response = await axios.get<IComment[]>(
        "http://localhost:3001/comments"
      );
      setAllComment(response.data);
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };

  // enter 키 누를 시 댓글 업로드
  const handleKeyUp = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && comment.length > 0) {
      await commentCreate(
        "rhino",
        "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
        comment,
        new Date().toLocaleString()
      );
      setComment("");
    }
    /**
     * TODO: 서버 연결 시, setAllComment(res.data)를 통해 전체 댓글 실시간 업데이트 구현
     */
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
    /**
     * TODO: 서버 연결 시, setAllComment(res.data)를 통해 전체 댓글 실시간 업데이트 구현
     */
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
              <button onClick={handleEdit}>수정</button>
              <button onClick={handleDelete}>삭제</button>
              <button>url 복사</button>
            </div>
          </StyledMid>
          <StyledContent>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </StyledContent>
          <StyledStarsWrapper>
            <StyledStar>
              {array.map((el, idx) => {
                return (
                  <StarRate
                    key={idx}
                    size="50"
                    className={clicked[el] ? "yellow" : ""}
                  />
                );
              })}
            </StyledStar>
          </StyledStarsWrapper>
        </StyledContentWrapper>
        <hr className="post_middle_line" />
        <div className="post_like" onClick={handleLike} role="presentation">
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
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
                <MatPostComment key={comment.id} singleComment={comment} />
              ))}
        </StyledCommentContainer>
      </StyledDiv>
    </StyledModal>
  );
};

export default PostReadModal;
