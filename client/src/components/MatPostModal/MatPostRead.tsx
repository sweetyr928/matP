import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import {
  deletePost,
  IPlacesPost,
  likePost,
  dislikePost,
} from "../../api/axiosAPI/posts/PostsAxios";
import StarRate from "./StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MatCommentList from "./MatCommentList";
import { MatPostUpdate } from "..";
import { useNavigate } from "react-router";
import { Popover, Typography } from "@mui/material";
import moment from "moment";
import "moment/locale/ko";
import axios from "axios";
import { IComments } from "../../api/axiosAPI/comments/commentsAxios";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../store/userInfoAtoms";

const jwtToken = localStorage.getItem("Authorization");

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

  .disabled {
    display: none;
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
    font-size: 14px;
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

const PostReadModal = ({
  onClickToggleModal,
  id,
}: ModalDefaultType): JSX.Element => {
  const userInfo = useRecoilValue(userInfoState);
  const [nickname, setNickname] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [star, setStar] = useState<number>(0);
  const [placeId, setPlaceId] = useState<number>(0);
  const [comments, setComments] = useState<IComments[]>([]);
  const [isLikesCheck, setIsLikesCheck] = useState<boolean>(false);
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // popover ref
  const [anchorEL, setAnchorEL] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/places/1/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((res) => {
        setNickname(res.data.postInfo.memberInfo.nickname);
        setProfileUrl(res.data.postInfo.memberInfo.profileUrl);
        setTitle(res.data.postInfo.title);
        setContent(res.data.postInfo.content);
        setCreatedAt(res.data.postInfo.createdAt);
        setStar(res.data.postInfo.star);
        setPlaceId(res.data.postInfo.placeId);
        setComments(res.data.comments);
        setIsLikesCheck(res.data.isLikesCheck);
      })
      .catch(function (error) {
        throw error;
      });
  }, []);

  // 단일 post 삭제
  const { axiosData: deleteP } = useAxios(
    () => deletePost(id, placeId),
    [deleteClicked],
    true
  );

  //'좋아요'
  const { axiosData: likeP } = useAxios(() => likePost(id, placeId), [], true);

  // '좋아요' 취소
  const { axiosData: dislikeP } = useAxios(
    () => dislikePost(id, placeId),
    [],
    true
  );

  // matPostUpdate 컴포넌트로 post data 넘겨줌
  const postData = {
    postInfo: {
      id: id,
      title: title,
      content: content,
      createdAt: createdAt,
      star: star,
      memberInfo: {
        nickname: nickname,
        profileImg: profileUrl,
      },
    },
    comments: comments,
    isLikesCheck: isLikesCheck,
  };

  // // 별점 불러오기
  const clicked = new Array(5).fill(true, 0, star);

  // 항상 별이 총 5개(더미 array)
  const array: Array<number> = [0, 1, 2, 3, 4];

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
    deleteP();
    onClickToggleModal();
  };

  // post url
  // const handleUrl = () => {
  //   console.log("It's url");
  // };

  /**
   * post에 해당 하는 맛 플레이스 페이지로 이동
   * TODO : 서버 연결 후 url 변경 및 지도 이동 기능 추가
   */
  const handleMatPlace = () => {
    navigate(`/places/${placeId}`);
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

  // '하트' 이모지 클릭 시 like / default 상태로 바뀜
  const handleLike = () => {
    if (!isLikesCheck) {
      likeP();
      setIsLikesCheck(true);
    } else {
      dislikeP();
      setIsLikesCheck(false);
    }
  };

  return (
    <StyledModal>
      <span
        role="presentation"
        onClick={onClickToggleModal}
        className="close-btn"
      >
        &times;
      </span>
      {isEdit ? (
        <MatPostUpdate
          id={id}
          onClickToggleModal={onClickToggleModal}
          state={postData}
          placeId={placeId}
        />
      ) : (
        <StyledDiv>
          <StyledContentWrapper>
            <div className="post_title">{title}</div>
            <StyledMid>
              <StyledInfo>
                <img src={profileUrl} alt="profileImg"></img>
                <div className="post_nickname">{nickname}</div>
                <div className="post_createdAt">
                  {moment(createdAt, "YYYY-MM-DDTHH:mm:ss").format(
                    "YYYY년 MMM Do"
                  )}
                </div>
              </StyledInfo>
              <div>
                <button
                  onClick={handleEdit}
                  className={nickname !== userInfo.nickname ? "disabled" : ""}
                >
                  수정
                </button>
                <button
                  onClick={handleClick}
                  className={nickname !== userInfo.nickname ? "disabled" : ""}
                >
                  삭제
                </button>
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
                <button>url 복사</button>
                <button onClick={handleMatPlace}>맛 플레이스로 이동</button>
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
            {isLikesCheck ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
          <MatCommentList comments={comments} placeId={placeId} postId={id} />
        </StyledDiv>
      )}
    </StyledModal>
  );
};

export default PostReadModal;
