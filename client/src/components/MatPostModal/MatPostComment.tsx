import styled from "styled-components";

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1.4px solid #a19e9e;
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
  margin: 0px 0px 10px 0px;
`;

const MatPostComment = () => {
  return (
    <StyledComment>
      <StyledDiv>
        <StyledInfo>
          <img
            src={
              "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg"
            }
            alt="profileImg"
          ></img>
          <div className="post_nickname">nickname</div>
          <div className="post_createdAt">createdat</div>
        </StyledInfo>
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </StyledDiv>
      <StyledContent>
        <div>comment</div>
      </StyledContent>
    </StyledComment>
  );
};

export default MatPostComment;
