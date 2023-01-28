import { useNavigate } from "react-router";
import styled from "styled-components";
import useAxios from "../hooks/useAxios";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useRef, useEffect } from "react";
import {
  updateMyData,
  getMyData,
  getMyFollowings,
  getMyFollowers,
  convertImageUrl,
} from "../api/axiosAPI/members/myPageAPI";
import { ModalPortal } from "../components";
import { userInfoState } from "../store/userInfoAtoms";
import { useSetRecoilState } from "recoil";

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
  font-size: 15px;
  color: #373737;
  margin: 10px 0;
`;
const FollowButton = styled.button`
  font-size: 15px;
  color: #373737;
  background-color: #f8f8f8;
  border: none;
  padding: 0 10px 0 0;
  cursor: pointer;
  &:hover {
    color: #6b6b6b;
  }
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
  .focused {
    color: #373737;
    border-bottom: 1px solid #373737;
  }
`;

const ModalContainer = styled.div`
  margin: auto;
  position: absolute;
  z-index: 1001;
`;
const ModalBackdrop = styled.div`
  top: 0;
  left: 0;
  width: calc(1340px * 2 / 5 - 63px);
  height: 100vh;
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.2);
`;
const ModalView = styled.div.attrs(() => ({
  role: "dialog",
}))`
  opacity: 1;
  transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  position: absolute;
  bottom: 22vh;
  left: 70px;
  background-color: #fff;
  border-radius: 7px;
  padding: 24px;
  width: 394px;
  height: 55vh;
  box-shadow: 1px 0px 86px -17px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1002;
  overflow: scroll;
  .button-container {
    margin-top: 24px;
    display: flex;
  }
  .image_upload {
    display: none;
  }
`;
const Header = styled.h1`
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
  cursor: pointer;
  &:hover {
    filter: brightness(0.6);
  }
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  color: #373737;
  font-size: 1rem;
  border: 1px solid #e3e6e8;
  background-color: #fff;
  border-radius: 5px;

  &:focus {
    outline: none;
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

const FollowModalView = styled.div.attrs(() => ({
  role: "dialog",
}))`
  position: absolute;
  bottom: 22vh;
  left: 70px;
  background-color: #fff;
  border-radius: 7px;
  padding: 6px 12px;
  width: 394px;
  height: 50vh;
  box-shadow: 1px 0px 86px -17px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1002;
  overflow: scroll;
`;
const FollowContainer = styled.div`
  width: 100%;
  height: 4rem;
  padding: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cfcfcf;
  cursor: pointer;
  &:hover {
    background-color: rgb(247, 247, 247);
  }
`;
const ImageContainer = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  margin: 0 30px;
`;
const NickName = styled.span`
  font-size: 1.1rem;
`;

const LogoutModal = styled.div`
  position: absolute;
  bottom: 40vh;
  left: 70px;
  background-color: #fff;
  border-radius: 7px;
  padding: 24px;
  width: 394px;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  span {
    font-size: 1.5rem;
  }
`;
const ButtonContainer = styled.div`
  margin-top: 30px;
  button {
    cursor: pointer;
    background-color: #fff;
    text-decoration: none;
    border: none;
    font-size: 20px;
    padding: 10px 30px;
  }
  .yes {
    color: #ad0000;
    &:hover {
      color: #ff8b8b;
    }
  }
  .no {
    &:hover {
      color: #7c7c7c;
    }
  }
`;

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const onClickTab = () => {
    navigate("/pickers");
  };

  const { axiosData: getAxios, responseData: memberData } = useAxios(getMyData);
  const { responseData: followingData } = useAxios(getMyFollowings);
  const { responseData: followerData } = useAxios(getMyFollowers);

  const { nickname, memo, followers, followings, profileUrl } = memberData || {};

  const [isOpenEditModal, setOpenEditModal] = useState<boolean>(false);
  const [isOpenFollowingModal, setOpenFollowingModal] = useState<boolean>(false);
  const [isOpenFollowerModal, setOpenFollowerModal] = useState<boolean>(false);
  const [isOpenLogoutModal, setOpenLogoutModal] = useState<boolean>(false);

  const [revisedName, setRevisedName] = useState(nickname);
  const [revisedMemo, setRevisedMemo] = useState(memo);
  const [revisedImage, setRevisedImage] = useState(profileUrl);

  const setUserInfo = useSetRecoilState(userInfoState);

  // 프로필 이미지 수정을 위한 ref
  const fileInput = useRef<HTMLInputElement>(null);

  const { axiosData: updateAxios } = useAxios(
    () => updateMyData(revisedName, revisedImage, revisedMemo),
    [revisedName, revisedImage, revisedMemo],
    true
  );

  useEffect(() => {
    getAxios();
  }, [revisedName, revisedImage, revisedMemo]);

  const onClickToggleEditModal = () => {
    setOpenEditModal(!isOpenEditModal);
    setRevisedName(nickname);
    setRevisedMemo(memo);
    setRevisedImage(revisedImage);
  };

  const onClickToggleFollowingModal = () => {
    setOpenFollowingModal(!isOpenFollowingModal);
  };
  const onClickToggleFollowerModal = () => {
    setOpenFollowerModal(!isOpenFollowerModal);
  };

  const onClickToggleLogoutModal = () => {
    setOpenLogoutModal(!isOpenLogoutModal);
  };

  // 프로필 이미지 클릭시 파일 업로더 뜸
  const onClickImg = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  // image uploader
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const uploadFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", uploadFile);
    const responseUrl = await convertImageUrl(formData);
    // response 형태에 맞추어 변경
    console.log(responseUrl);
    setRevisedImage(responseUrl);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevisedName(e.target.value);
  };
  const onChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevisedMemo(e.target.value);
  };

  const onRevise = () => {
    updateAxios();
    onClickToggleEditModal();
  };

  const logoutHandler = () => {
    localStorage.removeItem("Authorization");
    setUserInfo({});
    navigate("/");
    window.location.reload();
  };

  return (
    <FeedContainer>
      <div className="userInfo_header_container">
        <UserImg src={profileUrl} alt="프로필사진" />
        <UserInfo>
          <UserNickname>{nickname}</UserNickname>
          <UserRemainder>{memo}</UserRemainder>
          <UserRemainder>
            <FollowButton onClick={onClickToggleFollowingModal}>팔로잉 {followings}</FollowButton>
            <FollowButton onClick={onClickToggleFollowerModal}>팔로워 {followers}</FollowButton>
          </UserRemainder>
        </UserInfo>
        <EditIconStyled onClick={onClickToggleEditModal} />
        <LogoutIconStyled onClick={onClickToggleLogoutModal} />
      </div>
      <ContentContainer>
        <TabContainer>
          <div className="tab_menu focused" aria-hidden="true">
            Post
          </div>
          <div className="tab_menu" onClick={onClickTab} aria-hidden="true">
            Pick
          </div>
        </TabContainer>
      </ContentContainer>

      {isOpenFollowingModal && (
        <ModalPortal>
          <ModalContainer>
            <FollowModalView>
              {followingData.map((item) => (
                <FollowContainer key={item.memberId}>
                  <ImageContainer src={item.profileUrl} alt="프로필 사진" />
                  <NickName>{item.nickname}</NickName>
                </FollowContainer>
              ))}
            </FollowModalView>
          </ModalContainer>
          <ModalBackdrop onClick={onClickToggleFollowingModal} />
        </ModalPortal>
      )}
      {isOpenFollowerModal && (
        <ModalPortal>
          <ModalContainer>
            <FollowModalView>
              {followerData.map((item) => (
                <FollowContainer key={item.memberId}>
                  <ImageContainer src={item.profileUrl} alt="프로필 사진" />
                  <span>{item.nickname}</span>
                </FollowContainer>
              ))}
            </FollowModalView>
          </ModalContainer>
          <ModalBackdrop onClick={onClickToggleFollowerModal} />
        </ModalPortal>
      )}

      {isOpenEditModal && (
        <ModalPortal>
          <ModalContainer>
            <ModalView>
              <Header>정보 수정하기</Header>
              <div>
                <EditUserImg
                  src={revisedImage || profileUrl}
                  alt="프로필 사진"
                  onClick={onClickImg}
                />
                <input
                  type="file"
                  accept="image/jpg,impge/png,image/jpeg"
                  name="profile_img"
                  className="image_upload"
                  onChange={onChangeImage}
                  ref={fileInput}
                />
              </div>
              <Input type="text" value={revisedName || ""} onChange={onChangeName}></Input>
              <Input type="text" value={revisedMemo || ""} onChange={onChangeMemo}></Input>
              <div className="button_container">
                <ModalBtn onClick={onRevise}>제출</ModalBtn>
                <ModalBtn onClick={onClickToggleEditModal}>취소</ModalBtn>
              </div>
            </ModalView>
          </ModalContainer>
          <ModalBackdrop onClick={onClickToggleEditModal} />
        </ModalPortal>
      )}
      {isOpenLogoutModal && (
        <ModalPortal>
          <ModalContainer>
            <LogoutModal>
              <span>정말 로그아웃 하시겠습니까?</span>
              <ButtonContainer>
                <button className="yes" onClick={logoutHandler}>
                  예
                </button>
                <button className="no" onClick={onClickToggleLogoutModal}>
                  아니오
                </button>
              </ButtonContainer>
            </LogoutModal>
          </ModalContainer>
          <ModalBackdrop onClick={onClickToggleLogoutModal} />
        </ModalPortal>
      )}
    </FeedContainer>
  );
};

export default MyPage;
