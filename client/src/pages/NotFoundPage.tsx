import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PageWrapper = styled.div`
  height: 100%;
  min-width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 65px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  color: #373737;
  font-size: 20px;
  margin-bottom: 20px;

  .icon {
    margin-top: 160px;
    margin-bottom: 50px;
    font-size: 220px;
    color: #505050;
  }
  .notice {
    font-size: 30px;
    margin-bottom: 20px;
  }

  button {
    font-size: 16px;
    margin-top: 35px;
    padding: 18px;
    border: none;
    border-radius: 50px;
    color: white;
    background-color: #874356;
    cursor: pointer;
    :hover {
      filter: brightness(0.8);
    }
  }
`;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <ErrorOutlineIcon className="icon" />
      <p className="notice">앗!</p>
      <p>존재하지 않는 맛페이지입니다 :(</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로 가기
      </button>
    </PageWrapper>
  );
};

export default NotFoundPage;
