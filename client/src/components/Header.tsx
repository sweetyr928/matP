import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getMyData } from "../api/axiosAPI/members/myPageAPI";

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

const ImgContainer = styled.div`
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

  overflow: hidden;
`;

const ProfileImg = styled.img`
  color: #505050;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const EmptyImg = styled.div`
  color: #505050;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const LogInButton = styled(LoginIcon)`
  color: #505050;
  transform: scale(1.5);
`;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const Authorization = searchParams.get("access_token");
  useEffect(() => {
    if (Authorization || jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const jwtToken = localStorage.getItem("Authorization");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { responseData: memberData, status: accountStatus } = useAxios(getMyData, [], true);

  useEffect(() => {
    if (accountStatus === "Success") {
      if (jwtToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    console.log(jwtToken, isLoggedIn, accountStatus);
  }, [jwtToken, accountStatus, isLoggedIn]);

  const { profileUrl } = memberData || {};

  return (
    <HeaderContainer>
      {isLoggedIn && accountStatus === "Success" ? (
        <Link to="/mypage">
          <ImgContainer>
            {profileUrl ? <ProfileImg src={profileUrl} alt="Profile Picture" /> : <EmptyImg />}
          </ImgContainer>
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
