import styled from "styled-components";
import { useState } from "react";
import { createComment } from "../../api/axiosAPI/comments/commentsAxios";
import useAxios from "../../hooks/useAxios";

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

  const { axiosData } = useAxios(
    () => createComment(comment, placeId, postId),
    [comment],
    true
  );

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
