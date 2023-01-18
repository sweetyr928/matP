import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { LoginModal, ModalPortal } from "./index";

const HeaderContainer = styled.div`
  background-color: #ffffff;
  min-height: 57px;
  position: absolute;
  min-width: calc(1340px * 2 / 5 - 63px);
  float: inline-start;
  z-index: 998;
  border-bottom: 1px solid #d7d9dc;
  padding-left: 63px;
  border-right: 1px solid #d7d9dc;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    filter: brightness(0.6);
  }
`;

const AccountCircleIconStyled = styled(AccountCircleIcon)`
  color: #505050;
`;

const LogInButton = styled(LoginIcon)`
  color: #505050;
`;

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onClickToggleLoginModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  return (
    <HeaderContainer>
      {/* 나중에 토큰 조건 분기에 따라 로그인 바뀜 */}
      <IconContainer>
        <LogInButton onClick={onClickToggleLoginModal} />
      </IconContainer>
      {isModalOpen && (
        <ModalPortal>
          <LoginModal onClickToggleLoginModal={onClickToggleLoginModal} />
        </ModalPortal>
      )}

      {/* <Link to={"/mypage"}>
        <IconContainer>
          <AccountCircleIconStyled fontSize="large" />
        </IconContainer>
      </Link> */}
    </HeaderContainer>
  );
};

export default Header;
