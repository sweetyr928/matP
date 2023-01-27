import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { ModalPortal } from "./index";

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
  transform: scale(1.25);
`;

const LogInButton = styled(LoginIcon)`
  color: #505050;
  transform: scale(1.25);
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("Authorization");

  return (
    <HeaderContainer>
      {/* 나중에 토큰 조건 분기에 따라 로그인 바뀜 */}
      {jwtToken ? (
        <Link to={"/mypage"}>
          <IconContainer>
            <AccountCircleIconStyled />
          </IconContainer>
        </Link>
      ) : (
        <IconContainer>
          <LogInButton onClick={() => navigate("/login")} />
        </IconContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
