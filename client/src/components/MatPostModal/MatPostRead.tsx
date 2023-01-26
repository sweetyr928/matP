import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import { useState, useCallback } from "react";
import { getPlacesPost, deletePost } from "../../utils/axiosAPI/posts/PostsAxios";
import StarRate from "./StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MatCommentList from "./MatCommentList";
import { MatPostUpdate } from "..";
import { useNavigate } from "react-router";
import { Popover, Typography } from "@mui/material";

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

// 모달 토글 버튼 연결 (타입 지정)
interface ModalDefaultType {
  onClickToggleModal: () => void;
  id: number;
}

const PostReadModal = ({ onClickToggleModal, id }: ModalDefaultType): JSX.Element => {
  const [isOpenUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // popover ref
  const [anchorEL, setAnchorEL] = useState(null);

  // 업데이트 모달 토글 함수
  const onClickToggleUpdateModal = useCallback(() => {
    setOpenUpdateModal(!isOpenUpdateModal);
  }, [isOpenUpdateModal]);

  // 단일 post data GET
  const { responseData } = useAxios(() => getPlacesPost(id), [id], false);

  // 단일 post 삭제
  const { axiosData } = useAxios(() => deletePost(id), [deleteClicked], true);

  const navigate = useNavigate();

  const {
    nickname = "",
    profileimg = "",
    createdat = "",
    title = "",
    content = "",
    star = 0,
    likes = 0,
    // comments = [],
  } = responseData || {};

  // 별점 불러오기
  const clicked = new Array(5).fill(true, 0, star);

  // 항상 별이 총 5개(더미 array)
  const array: Array<number> = [0, 1, 2, 3, 4];

  // 날짜 변환
  const setDateFormat = (date: string) => {
    let newStr = date.split(".");
    newStr = newStr[0].split("T");
    return newStr.join(" ");
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  // popover post 삭제
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEL(e.currentTarget);
  };

  // popover post 삭제 취소
  const handleClose = () => {
    setAnchorEL(null);
  };

  const handleDelete = () => {
    setDeleteClicked(!deleteClicked);
    axiosData();
    onClickToggleModal();
  };

  // post url
  const handleUrl = () => {
    console.log("It's url");
  };

  /**
   * post에 해당 하는 맛 플레이스 페이지로 이동
   * TODO : 서버 연결 후 url 변경 및 지도 이동 기능 추가
   */
  const handleMatPlace = () => {
    navigate("/places");
  };

  // '하트' 이모지 클릭 시 like / default 상태로 바뀜
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // popover styling
  const PopoverStyle = {
    zIndex: 10000,
    top: "10px",
  };

  const PopoverTStyle = {
    backgroundColor: "#e1e1e1",
    fontSize: "15px",
  };

  const PopoverBtnStyle = {
    backgroundColor: "#874356",
    color: "#ffffff",
    border: "none",
    marginLeft: "5px",
    borderRadius: "30px",
    cursor: "pointer",
    width: "40px",
    height: "20px",
  };

  return (
    <StyledModal>
      <span role="presentation" onClick={onClickToggleModal} className="close-btn">
        &times;
      </span>
      {isEdit ? (
        <MatPostUpdate id={id} onClickToggleModal={onClickToggleUpdateModal} state={responseData} />
      ) : (
        <StyledDiv>
          <StyledContentWrapper>
            <div className="post_title">{title}</div>
            <StyledMid>
              <StyledInfo>
                <img src={profileimg} alt="profileImg"></img>
                <div className="post_nickname">{nickname}</div>
                <div className="post_createdAt">{setDateFormat(createdat)}</div>
              </StyledInfo>
              <div>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleClick}>삭제</button>
                <Popover
                  open={Boolean(anchorEL)}
                  onClose={handleClose}
                  anchorEl={anchorEL}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  style={PopoverStyle}
                >
                  <Typography variant="body2" p={3} style={PopoverTStyle}>
                    정말 삭제하시겠습니까?
                    <button style={PopoverBtnStyle} onClick={handleDelete}>
                      Yes
                    </button>
                    <button style={PopoverBtnStyle} onClick={handleClose}>
                      No
                    </button>
                  </Typography>
                </Popover>
                <button onClick={handleUrl}>url 복사</button>
                <button onClick={handleMatPlace}>맛 플레이스로 이동</button>
              </div>
            </StyledMid>
            <StyledContent>
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </StyledContent>
            <StyledStarsWrapper>
              <StyledStar>
                {array.map((el, idx) => {
                  return <StarRate key={idx} size="50" className={clicked[el] ? "yellow" : ""} />;
                })}
              </StyledStar>
            </StyledStarsWrapper>
          </StyledContentWrapper>
          <hr className="post_middle_line" />
          <div className="post_like" onClick={handleLike} role="presentation">
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
          {/* 서버 연결 이후 Props로 해당 Post의 comment list 넘겨주기 */}
          <MatCommentList />
        </StyledDiv>
      )}
    </StyledModal>
  );
};

export default PostReadModal;
