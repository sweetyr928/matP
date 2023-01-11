import styled from "styled-components";

const StyledModal = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 1500px;
  height: 800px;

  > span.close-btn {
    margin-top: 5px;
    cursor: pointer;
  }

  > div.desc {
    margin-top: 25px;
    color: #4000c7;
  }
`;

const PostReadModal = ({
  openModalHandler,
}: {
  openModalHandler?: React.MouseEventHandler;
}): JSX.Element => {
  return (
    <StyledModal>
      <span
        role="presentation"
        onClick={openModalHandler}
        className="close-btn"
      >
        &times;
      </span>
      <div className="desc">hi</div>
    </StyledModal>
  );
};

export default PostReadModal;
