import styled from "styled-components";
import { useState } from "react";
import { createComment } from "../../api/axiosAPI/comments/commentsAxios";
import useAxios from "../../hooks/useAxios";

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
    border-radius: 10px;
    padding: 0px 10px;
  }

  input:focus {
    outline: rgb(241, 133, 137, 0.4) solid 3px;
  }

  button {
    width: 5%;
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

  const { axiosData } = useAxios(() => createComment(comment, placeId, postId), [comment], true);

  // 댓글 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // enter 키 누를 시 댓글 업로드
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && comment.length > 0) {
      axiosData();
      setComment("");
      getAllCommentsReload();
    }
  };

  // 댓글 업로드
  const handleSumbit = () => {
    if (comment.length > 0) {
      axiosData();
      setComment("");
      getAllCommentsReload();
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
