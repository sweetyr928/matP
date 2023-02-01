import styled from "styled-components";
import kakaoLogo from "../assets/images/kakaoLogo.svg";
import googleLogo from "../assets/images/googleLogo.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const StyledFeed = styled.div`
  height: 100%;
  /* height: 100vh; */
  min-width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 65px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const LoginHeader = styled.h2`
  color: #373737;
  font-weight: 700;
  font-size: 2rem;
  margin-top: -200px;
`;
const LoginViceHeader = styled.h3`
  color: #373737;
  font-weight: 500;
  font-size: 1.2rem;
  margin-top: 1.2rem;
`;

const OAuthButtonForm = styled.div`
  margin-top: 5rem;
  display: flex;
`;
const KakaoLoginContainer = styled.button`
  text-decoration: none;
  width: 10rem;
  height: 10rem;
  background-color: #fee500;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0.1px solid #dfc900;
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  &:hover {
    background-color: #f3da00;
  }
`;
const KakaoLogoImg = styled.img`
  width: 6rem;
  height: 6rem;
`;

const GoogleLoginContainer = styled.button`
  text-decoration: none;
  width: 10rem;
  height: 10rem;
  background-color: #fff;
  color: #373737;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0.1px solid #d4d4d4;
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const GoogleLogoImg = styled.img`
  width: 6rem;
  height: 6rem;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const Authorization = searchParams.get("access_token") || null;
  useEffect(() => {
    if (Authorization) {
      localStorage.setItem("Authorization", Authorization);
      navigate("/");
      window.location.reload();
    }
  }, []);

  const handleKakaoLogin = () => {
    window.location.href =
      "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao";
  };
  const handleGoogleLogin = () => {
    window.location.href =
      "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google";
  };

  return (
    <StyledFeed>
      <LoginHeader>로그인</LoginHeader>
      <LoginViceHeader>맛 피플이 되어 보실래요?</LoginViceHeader>
      <OAuthButtonForm>
        <KakaoLoginContainer onClick={handleKakaoLogin}>
          <KakaoLogoImg src={kakaoLogo} alt="카카오로 시작하기"></KakaoLogoImg>
        </KakaoLoginContainer>

        <GoogleLoginContainer onClick={handleGoogleLogin}>
          <GoogleLogoImg src={googleLogo} alt="구글로 시작하기"></GoogleLogoImg>
        </GoogleLoginContainer>
      </OAuthButtonForm>
    </StyledFeed>
  );
};

export default LoginPage;
