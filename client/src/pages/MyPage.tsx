import { useNavigate } from "react-router";
import styled from "styled-components";
import useAxios from "../utils/useAxios";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { memberUpdate } from "../utils/API";
import { ModalPortal } from "../components";

const FeedContainer = styled.div`
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
  .userInfo_header_container {
    display: flex;
    margin-bottom: 32px;
  }
`;

const UserImg = styled.img`
  width: 132px;
  height: 132px;
  border-radius: 100%;
  margin: 32px 25px 0 0;
  border: 1px solid #a6a6a6;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserNickname = styled.h2`
  color: #373737;
  font-size: 23px;
  margin-top: 52px;
  margin-bottom: 10px;
`;
const UserRemainder = styled.span`
  color: #373737;
  font-size: 15px;
  margin: 10px 0;
`;

const LogoutIconStyled = styled(LogoutIcon)`
  color: #505050;
  cursor: pointer;
  border-radius: 30%;
  position: absolute;
  right: 10px;
  &:hover {
    background-color: rgb(218, 217, 217);
  }
`;
const EditIconStyled = styled(EditIcon)`
  color: #505050;
  cursor: pointer;
  border-radius: 30%;
  position: absolute;
  right: 44px;
  &:hover {
    background-color: rgb(218, 217, 217);
  }
`;

const ContentContainer = styled.section`
  width: 100%;
`;
const TabContainer = styled.div`
  display: flex;
  padding: 0 -8px;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  .tab_menu {
    font-size: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 14px 0;
    color: #a6a6a6;
    &:hover {
      background-color: rgb(236, 236, 236);
    }
  }
  .present {
    color: #373737;
    border-bottom: 1px solid #373737;
  }
`;

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
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.2);
`;
const ModalView = styled.div.attrs(() => ({
  role: "dialog",
}))`
  opacity: 1;
  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  position: absolute;
  top: calc(50vh - 230px);
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
const Header = styled.h1`
  color: #2961b9;
  font-size: 2.07692308rem;
  font-weight: normal;
  line-height: calc((13+2) / 13);
  text-align: center;
`;
const EditUserImg = styled.img`
  width: 132px;
  height: 132px;
  border-radius: 100%;
  border: 1px solid #a6a6a6;
  margin: 10px 0;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  color: #0c0d0e;
  border: 1px solid #e3e6e8;
  background-color: #fff;
  border-radius: 5px;

  &:focus {
    outline: none;
    border-color: #babec1;
  }
`;
const ModalBtn = styled.button`
  background-color: #fff;
  color: #7d858d;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  margin: 4px;
  padding: 10px;
  margin: 10px 20px;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  :hover {
    background-color: #f8f9f9;
    cursor: pointer;
  }
`;

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const onClickTab = () => {
    navigate("/pickers");
  };

  const url = "http://localhost:3001/members";
  const { memberData } = useAxios(url);

  const {
    nickname = "",
    profileImg = "",
    memo = "",
    followers = "",
    followings = "",
  } = memberData || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [revisedName, setRevisedName] = useState(nickname);
  const [revisedMemo, setRevisedMemo] = useState(memo);

  const modalOpenHandler = () => {
    setRevisedName(nickname);
    setRevisedMemo(memo);
    setIsModalOpen(true);
  };
  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevisedName(e.target.value);
  };
  const onChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevisedMemo(e.target.value);
  };

  const onRevise = () => {
    memberUpdate(revisedName, profileImg, revisedMemo);
    modalCloseHandler();
  };

  return (
    <FeedContainer>
      {isModalOpen && (
        <ModalPortal>
          <ModalContainer>
            <ModalBackdrop>
              <ModalView>
                <Header>정보 수정하기</Header>
                <EditUserImg src={profileImg} alt="프로필사진" />
                <Input type="text" value={revisedName} onChange={onChangeName}></Input>
                <Input type="text" value={revisedMemo} onChange={onChangeMemo}></Input>
                <div className="button_container">
                  <ModalBtn onClick={onRevise}>제출</ModalBtn>
                  <ModalBtn onClick={modalCloseHandler}>취소</ModalBtn>
                </div>
              </ModalView>
            </ModalBackdrop>
          </ModalContainer>
        </ModalPortal>
      )}
      <div className="userInfo_header_container">
        <UserImg src={profileImg} alt="프로필사진" />
        <UserInfo>
          <UserNickname>{nickname}</UserNickname>
          <UserRemainder>{memo}</UserRemainder>
          <UserRemainder>
            팔로워 {followers} 팔로잉 {followings}
          </UserRemainder>
        </UserInfo>
        <EditIconStyled onClick={modalOpenHandler} />

        <LogoutIconStyled />
      </div>
      <ContentContainer>
        <TabContainer>
          <div className="tab_menu present" aria-hidden="true">
            Post
          </div>
          <div className="tab_menu" onClick={onClickTab} aria-hidden="true">
            Pick
          </div>
        </TabContainer>
      </ContentContainer>
    </FeedContainer>
  );
};

export default MyPage;
