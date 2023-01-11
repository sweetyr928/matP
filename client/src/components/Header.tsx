import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

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

const UserIconContainer = styled.div`
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

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Link to={"/mypage"}>
        <UserIconContainer>
          <AccountCircleIconStyled fontSize="large" />
        </UserIconContainer>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
