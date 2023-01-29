import styled from "styled-components";
import { useState } from "react";
import {
  updateComment,
  deleteComment,
  IComments,
} from "../../api/axiosAPI/comments/commentsAxios";
import useAxios from "../../hooks/useAxios";
import { Popover, Typography } from "@mui/material";
import moment from "moment";
import "moment/locale/ko";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../store/userInfoAtoms";

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1.4px solid #dcdcdc;
  margin: 0px 0px 5px 0px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 10px 0px;

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
  text-align: center;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0px 10px 0px 0px;
  }

  .comment_nickname {
    font-size: 15px;
    margin: 0px 10px 0px 0px;
  }

  .comment_createdAt {
    font-size: 13.5px;
    margin: 2.13px 0px 0px 0px;
  }
`;

const StyledEdit = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 10px 0px;

  input {
    width: 1080px;
    line-height: 25px;
    border: none;
    border-bottom: 1px solid;
    font-size: 15px;
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

const StyledContent = styled.div`
  margin: 0px 0px 10px 0px;

  div {
    line-height: 25px;
  }
`;

const MatComment = ({
  singleComment,
  placeId,
  postId,
  getAllComments,
}: {
  singleComment: IComments;
  placeId: number;
  postId: number;
  getAllComments: () => void;
}) => {
  const userInfo = useRecoilValue(userInfoState);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // Comment 객체
  const [newSingleComment, setNewSingleComment] =
    useState<IComments>(singleComment);
  // 새로 바뀐 댓글의 내용
  const [editedComment, setEditedComment] = useState<string>(
    singleComment.commentContent
  );
  const [createdAt, setCreatedAt] = useState<string>(
    singleComment.commentCreatedAt
  );
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  // popover ref
  const [anchorEL, setAnchorEL] = useState(null);

  const { axiosData: updateC } = useAxios(
    () =>
      updateComment(editedComment, placeId, postId, newSingleComment.CommentId),
    [editedComment],
    true
  );

  const { axiosData: deleteC } = useAxios(
    () => deleteComment(placeId, postId, newSingleComment.CommentId),
    [deleteClicked],
    true
  );

  // 댓글 수정
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // popover comment 삭제
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEL(e.currentTarget);
  };

  // popover comment 삭제 취소
  const handleClose = () => {
    setAnchorEL(null);
  };

  // 댓글 삭제
  const handleDelete = () => {
    setDeleteClicked(!deleteClicked);
    deleteC();
    getAllComments();
  };

  // 댓글 수정 input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedComment(e.target.value);
  };

  // enter 키 누를 시 댓글 업데이트
  const handleKeyUp = async (e: React.KeyboardEvent) => {
    setCreatedAt(new Date().toLocaleString());
    if (e.key === "Enter" && editedComment.length > 0) {
      updateC();
      setIsEditing(!isEditing);
      setNewSingleComment({
        ...newSingleComment,
        ...{
          commentContent: editedComment,
          commentCreatedat: new Date().toLocaleString(),
        },
      });
    }
  };

  // 댓글 수정 취소
  const handleCancel = () => {
    setIsEditing(!isEditing);
  };

  // popover styling
  const PopoverStyle = {
    zIndex: 10000,
    top: "5px",
  };

  const PopoverTStyle = {
    backgroundColor: "#e1e1e1",
    fontSize: "12px",
  };

  const PopoverBtnStyle = {
    backgroundColor: "#874356",
    color: "#ffffff",
    border: "none",
    marginLeft: "5px",
    borderRadius: "30px",
    cursor: "pointer",
    width: "35px",
    height: "18px",
  };

  return (
    <StyledComment>
      <StyledDiv>
        <StyledInfo>
          <img
            src={newSingleComment.memberInfo.profileUrl}
            alt="profileImg"
          ></img>
          <div className="comment_nickname">
            {newSingleComment.memberInfo.nickname}
          </div>
          <div className="comment_createdAt">
            {moment(createdAt, "YYYY-MM-DDTHH:mm:ss").format("YYYY년 MMM Do")}
          </div>
        </StyledInfo>
        <div>
          <button
            onClick={handleEdit}
            className={
              newSingleComment.memberInfo.nickname !== userInfo.nickname
                ? "disabled"
                : ""
            }
          >
            수정
          </button>
          <button
            onClick={handleClick}
            className={
              newSingleComment.memberInfo.nickname !== userInfo.nickname
                ? "disabled"
                : ""
            }
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
            <Typography variant="body2" p={2} style={PopoverTStyle}>
              정말 삭제하시겠습니까?
              <button style={PopoverBtnStyle} onClick={handleDelete}>
                Yes
              </button>
              <button style={PopoverBtnStyle} onClick={handleClose}>
                No
              </button>
            </Typography>
          </Popover>
        </div>
      </StyledDiv>
      <StyledContent>
        {isEditing ? (
          <StyledEdit>
            <input
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={editedComment}
              type="text"
            />
            <button onClick={handleCancel}>취소</button>
          </StyledEdit>
        ) : (
          <div>{newSingleComment.commentContent}</div>
        )}
      </StyledContent>
    </StyledComment>
  );
};

export default MatComment;
