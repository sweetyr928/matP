import { useNavigate } from "react-router";
import styled from "styled-components";
import { getMatPeople } from "../utils/axiosAPI/people/PeopleAxios";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState } from "react";
import useAxios from "../utils/useAxios";

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

  .matPeople_follow {
    display: flex;
  }
`;

const StyledFollow = styled(HowToRegIcon)`
  color: #505050;
  margin: 50px 0px 10px 0px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.6);
  }
`;

const StyledUnFollow = styled(PersonAddAlt1Icon)`
  color: #505050;
  margin: 50px 0px 10px 0px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.6);
  }
`;

const UserNickname = styled.h2`
  color: #373737;
  font-size: 23px;
  margin: 52px 10px 10px 0px;
`;

const UserRemainder = styled.span`
  color: #373737;
  font-size: 15px;
  margin: 10px 0;
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

const MatPeople: React.FC = () => {
  const navigate = useNavigate();
  const onClickTab = () => {
    navigate("/matPickers");
  };

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const { responseData } = useAxios(getMatPeople, [], false);

  const {
    nickname = "",
    profileImg = "",
    memo = "",
    followers = "",
    followings = "",
  } = responseData || {};

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <FeedContainer>
      <div className="userInfo_header_container">
        <UserImg src={profileImg} alt="프로필사진" />
        <UserInfo>
          <div className="matPeople_follow">
            <UserNickname>{nickname}</UserNickname>
            <div role="presentation" onClick={handleFollow}>
              {isFollowing ? <StyledFollow /> : <StyledUnFollow />}
            </div>
          </div>
          <UserRemainder>{memo}</UserRemainder>
          <UserRemainder>
            팔로워 {followers} 팔로잉 {followings}
          </UserRemainder>
        </UserInfo>
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

export default MatPeople;
