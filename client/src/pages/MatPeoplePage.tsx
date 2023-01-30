/* eslint-disable */
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { getPosts } from "../api/axiosAPI/posts/PostsAxios";
import {
  followMatPeople,
  getMatPeople,
  getMatPeopleInfoForUser,
  unfollowMatPeople,
} from "../api/axiosAPI/people/PeopleAxios";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { IPosts } from "../api/axiosAPI/posts/PostsAxios";
import PostRead from "../components/PostRead";

const FeedContainer = styled.div`
  height: 100%;
  min-width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 65px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  position: absolute;

  .userInfo_header_container {
    display: flex;
    margin-bottom: 32px;
    justify-content: flex-start;
    align-items: center;
  }
`;

const UserImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 100%;
  margin: 32px 25px 0 30px;
  border: 1px solid #a6a6a6;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  .matPeople_follow {
    display: flex;
  }
`;

const Follow = styled(HowToRegIcon)`
  color: #505050;
  position: absolute;
  right: 13px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.6);
  }
`;

const UnFollow = styled(PersonAddAlt1Icon)`
  color: #505050;
  position: absolute;
  right: 13px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.6);
  }
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

const StyledPosts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-gap: 4px;
  margin: 0px 0px 0px 0px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Nothing = styled.span`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  margin-top: 10vh;
`;

const MatPeople: React.FC = () => {
  const { id } = useParams();
  const [followReload, setFollowReload] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState(false);
  const [postsReload, setPostsReload] = useState<boolean>(false);

  useEffect(() => {
    !!localStorage.getItem("Authorization") ? setJwtToken(true) : setJwtToken(false);
  }, []);

  useEffect(() => {
    if (jwtToken) {
      getMatPeopleInfo();
      getMatPeopleInfoUser();
    } else if (!jwtToken) {
      getMatPeopleInfo();
    }
  }, [followReload]);

  const navigate = useNavigate();

  const {
    axiosData: getMatPeopleInfo,
    responseData: matPeople,
    status,
  } = useAxios(() => getMatPeople(Number(id)), [followReload], false);

  const { axiosData: getMatPeopleInfoUser, responseData: matPeopleUser } = useAxios(
    () => getMatPeopleInfoForUser(Number(id)),
    [followReload],
    false
  );

  const { axiosData: follow } = useAxios(() => followMatPeople(Number(id)), [], true);

  const { axiosData: unfollow } = useAxios(() => unfollowMatPeople(Number(id)), [], true);

  const { axiosData: getAllPosts } = useAxios(getPosts, [], false);

  useEffect(() => {
    getAllPosts();
  }, [postsReload]);

  const getAllPostsReload = () => {
    setPostsReload(!postsReload);
  };

  const {
    nickname = "",
    profileUrl = "",
    memo = "",
    followers = 0,
    followings = 0,
    postInfos = [],
    pickerGroupInfos = [],
  } = matPeople || {};

  const { isFollowing = false } = matPeopleUser || {};

  const handleFollow = () => {
    if (status === "Idle" || status === "Success") {
      if (isFollowing) {
        unfollow();
        setFollowReload(!followReload);
      } else {
        follow();
        setFollowReload(!followReload);
      }
    }
  };

  const onClickTab = () => {
    navigate("/matPickers", { state: pickerGroupInfos });
  };

  const postInfosFiltered = postInfos.filter((item: IPosts) => {
    item.id !== null;
  });

  return (
    <FeedContainer>
      <div className="userInfo_header_container">
        <UserImg src={profileUrl} alt="프로필사진" />
        <UserInfo>
          <div className="matPeople_follow">
            <UserNickname>{nickname}</UserNickname>
            <div role="presentation" onClick={handleFollow}>
              {isFollowing ? <Follow /> : <UnFollow />}
            </div>
          </div>
          {memo && <UserRemainder>{memo}</UserRemainder>}
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
      {postInfosFiltered && postInfosFiltered.length !== 0 ? (
        <StyledPosts>
          {postInfosFiltered &&
            postInfosFiltered.map((post: IPosts) => (
              <PostRead key={post.id} post={post} getAllPostsReload={getAllPostsReload} />
            ))}
        </StyledPosts>
      ) : (
        <Nothing>작성한 글이 없습니다!</Nothing>
      )}
    </FeedContainer>
  );
};

export default MatPeople;
