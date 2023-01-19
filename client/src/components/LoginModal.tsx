import { PropsWithChildren } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import kakaoLogo from "../images/kakaoLogo.svg";
import naverLogo from "../images/naverLogo.svg";
import googleLogo from "../images/googleLogo.svg";

const ModalContainer = styled.div`
  margin: auto;
  position: absolute;
  z-index: 1000;
`;
const ModalBackdrop = styled.div`
  top: 0;
  left: 0;
  width: calc(1340px * 2 / 5 - 63px);
  height: 100vh;
  position: fixed;
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.2);
`;
const ModalView = styled.div.attrs(() => ({
  role: "dialog",
}))`
  opacity: 1;
  z-index: 1002;
  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  position: absolute;
  bottom: 200px;
  left: 70px;
  background-color: #fff;
  border-radius: 7px;
  padding: 24px;
  width: 394px;
  height: 394px;
  box-shadow: 1px 0px 86px -17px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .button-container {
    margin-top: 24px;
    display: flex;
  }
`;
const CloseIconStyled = styled(CloseIcon)`
  color: #505050;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const LoginHeader = styled.h2`
  color: #373737;
  font-weight: 700;
  font-size: 1.5rem;
`;
const LoginViceHeader = styled.h3`
  color: #373737;
  font-weight: 500;
  margin-top: 1rem;
`;

const OAuthButtonForm = styled.div`
  margin-top: 1.5rem;
`;
const KakaoLoginContainer = styled.button`
  width: 306px;
  height: 40px;
  background-color: #fee500;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 0px;
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  &:hover {
    background-color: #f3da00;
  }
`;
const KakaoLogoImg = styled.img`
  width: 6%;
  margin-right: 10px;
`;
const KakaoLabel = styled.span`
  color: #000000 85%;
  font-size: 1.1rem;
`;
const NaverLoginContainer = styled.button`
  width: 306px;
  height: 40px;
  background-color: #03c75a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 0px;
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  &:hover {
    background-color: #04ba56;
  }
`;
const NaverLogoImg = styled.img`
  width: 6%;
  margin-right: 10px;
`;
const NaverLabel = styled.span`
  color: #fff 85%;
  font-size: 1.1rem;
`;
const GoogleLoginContainer = styled.button`
  width: 306px;
  height: 40px;
  background-color: #fff;
  color: #373737;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 0px;
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const GoogleLogoImg = styled.img`
  width: 8%;
  margin-right: 10px;
`;
const GoogleLabel = styled.span`
  color: #373737;
  font-size: 1.1rem;
`;

interface ModalDefaultType {
  onClickToggleLoginModal: () => void;
}
const LoginModal = ({ onClickToggleLoginModal }: PropsWithChildren<ModalDefaultType>) => {
  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleLoginModal) {
      onClickToggleLoginModal();
    }
  };

  return (
    <ModalContainer>
      <ModalView>
        <CloseIconStyled onClick={closeModal} />
        <LoginHeader>로그인</LoginHeader>
        <LoginViceHeader>맛 피플이 돼보실래요?</LoginViceHeader>
        <OAuthButtonForm>
          <KakaoLoginContainer>
            <KakaoLogoImg src={kakaoLogo} alt="카카오로 시작하기"></KakaoLogoImg>
            <KakaoLabel>카카오로 시작하기</KakaoLabel>
          </KakaoLoginContainer>
          <NaverLoginContainer>
            <NaverLogoImg src={naverLogo} alt="네이버로 시작하기"></NaverLogoImg>
            <NaverLabel>네이버로 시작하기</NaverLabel>
          </NaverLoginContainer>
          <GoogleLoginContainer>
            <GoogleLogoImg src={googleLogo} alt="구글로 시작하기"></GoogleLogoImg>
            <GoogleLabel>구글로 시작하기</GoogleLabel>
          </GoogleLoginContainer>
        </OAuthButtonForm>
      </ModalView>
      <ModalBackdrop onClick={closeModal} />
    </ModalContainer>
  );
};

export default LoginModal;
