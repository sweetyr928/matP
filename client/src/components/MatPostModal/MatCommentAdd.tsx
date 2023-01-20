import styled from "styled-components";
import { useState } from "react";
import { createComment } from "../../utils/axiosAPI/comments/commentsAxios";
import useAxios from "../../utils/useAxios";

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

const MatCommentAdd = (): JSX.Element => {
  const [comment, setComment] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");

  const { axiosData } = useAxios(
    () =>
      createComment(
        "rhino",
        "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
        comment,
        createdAt
      ),
    [createdAt],
    true
  );

  // 댓글 input 창
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // enter 키 누를 시 댓글 업로드
  const handleKeyUp = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && comment.length > 0) {
      try {
        setCreatedAt(new Date().toLocaleString());
        await axiosData();
        setComment("");
      } catch (error) {
        console.error("Error", error);
        throw error;
      }
    }
  };

  // 댓글 업로드
  const handleSumbit = async () => {
    if (comment.length > 0) {
      try {
        setCreatedAt(new Date().toLocaleString());
        await axiosData();
        setComment("");
      } catch (error) {
        console.error("Error", error);
        throw error;
      }
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
