/* eslint-disable */

import styled from "styled-components";

const StyledModal = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 1400px;
  height: 800px;
  display: flex;
  flex-direction: column;

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
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0px 20px 0px 0px;
  }

  .post_nickname {
    font-size: 15px;
    margin: 0px 20px 0px 0px;
  }

  .post_createdAt {
    font-size: 15px;
  }
`;

const StyledContent = styled.div`
  margin: 0px 0px 30px 0px;
`;

const StyledComment = styled.div`
  margin: 10px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
`;

const PostReadModal = ({
  closeModalHandler,
}: {
  closeModalHandler?: React.MouseEventHandler;
}): JSX.Element => {
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
          <div className="post_title">title</div>
          <StyledMid>
            <StyledInfo>
              <img
                src="https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg"
                alt="profileImg"
              ></img>
              <div className="post_nickname">닉네임</div>
              <div className="post_createdAt">2022. 10. 22. 17:34</div>
            </StyledInfo>
            <button>url 복사</button>
          </StyledMid>
          <StyledContent>
            <div>content</div>
          </StyledContent>
        </StyledContentWrapper>
        <StyledComment>
          <input></input>
          <button>게시</button>
        </StyledComment>
      </StyledDiv>
    </StyledModal>
  );
};

export default PostReadModal;
