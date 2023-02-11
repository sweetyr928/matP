import styled from "styled-components";
import { useState } from "react";
import { createComment } from "../../api/axiosAPI/comments/commentsAxios";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";

const StyledComment = styled.div`
  margin: 10px 0px 30px 0px;
  display: flex;
  justify-content: space-between;

  input {
    width: 93%;
    height: 30px;
    border: none;
    color: #373737;
    font-size: 1rem;
    margin: 0px 0px 0px 5px;
    border-radius: 5px;
    padding: 0px 10px;
  }

  input:focus {
    outline: #adadad solid 1px;
  }

  button {
    width: 47px;
    background-color: #874356;
    color: #ffffff;
    border: none;
    border-radius: 30px;
    font-size: 15px;
    cursor: pointer;
  }
`;

const MatCommentAdd = ({
  placeId,
  postId,
  getAllCommentsReload,
}: {
  placeId: number;
  postId: number;
  getAllCommentsReload: () => void;
}): JSX.Element => {
  const [comment, setComment] = useState<string>("");
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate();

  const { axiosData } = useAxios(() => createComment(comment, placeId, postId), [comment], true);

  // 댓글 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // enter 키 누를 시 댓글 업로드
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (!token) {
      alert("로그인이 필요합니다!");
      navigate("/login");
    } else if (e.key === "Enter" && comment.length > 0) {
      axiosData();
      setComment("");
      getAllCommentsReload();
    } else if (comment.length === 0) {
      alert("댓글을 입력해주세요!");
    }
  };

  // 댓글 업로드
  const handleSumbit = () => {
    if (!token) {
      alert("로그인이 필요합니다!");
      navigate("/login");
    } else if (comment.length > 0) {
      axiosData();
      setComment("");
      getAllCommentsReload();
    } else if (comment.length === 0) {
      alert("댓글을 입력해주세요!");
    }
  };

  return (
    <StyledComment>
      <input
        placeholder="댓글을 입력해주세요"
        onChange={handleInput}
        value={comment}
        onKeyUp={handleKeyUp}
      ></input>
      <button onClick={handleSumbit}>게시</button>
    </StyledComment>
  );
};

export default MatCommentAdd;
