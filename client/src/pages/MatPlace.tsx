import { useState, useCallback } from "react";
import styled from "styled-components";
import useAxios from "../utils/useAxios";
import { getPickers } from "../utils/axiosAPI/groups/PickersAxios";
import { getPlaceDetail } from "../utils/axiosAPI/places/PlacesAxios";
import { PostRead, MatPostCreate, ModalPortal } from "../components";

const FeedContainer = styled.div`
  height: 100%;
  width: calc(1340px * 2 / 5 - 63px);
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

const PlaceImg = styled.img`
  width: 132px;
  height: 132px;
  border-radius: 100%;
  margin: 32px 25px 0 0;
  border: 1px solid #a6a6a6;
`;
const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const PlaceName = styled.h2`
  color: #373737;
  font-size: 23px;
  margin-top: 52px;
  margin-bottom: 10px;
`;
const InfoBox = styled.span`
  color: #373737;
  font-size: 18px;
  margin: 10px 0;
  display: flex;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  button {
    font-size: 18px;
    border: none;
    background-color: transparent;
  }
`;
const PageContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  grid-gap: 4px;
  margin: 0px 0px 0px 0px;
`;

const PickContainer = styled.div`
  width: 100%;
  height: 400px;
  h3 {
    flex: 100;
    font-size: 20px;
    text-align: center;
    margin: 30px 0;
  }
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 15px;
  border-bottom: 1px solid black;
  .icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 20px;
    background: url(${(props) => props.color || "gray"});
    background-size: 100%;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 -8px;
  border-top: 1px solid #dbdbdb;

  .tab_menu {
    font-size: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 14px 0;
    color: #a6a6a6;
    border-bottom: 2px solid #dbdbdb;
    &:hover {
      background-color: rgb(236, 236, 236);
    }
  }
  .present {
    color: #373737;
    border-bottom: 2px solid #373737;
  }
`;

const PlaceDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 20px;
  img {
    width: 200px;
    height: 200px;
    margin: 30px 0;
  }
  .name {
    font-size: 30px;
    font-weight: 500px;
    margin-bottom: 30px;
  }

  p {
    margin-bottom: 20px;
  }
`;

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const groupImg = [
  "https://user-images.githubusercontent.com/94962427/213089353-0c35dd6b-a40f-46d9-88d0-03b515888bc8.png",
  "https://user-images.githubusercontent.com/94962427/213089385-ef2f1dc2-3192-4aaa-b9fd-aa108ec46675.png",
  "https://user-images.githubusercontent.com/94962427/213089403-2602dbbb-cbc5-4090-825d-636708940b9b.png",
  "https://user-images.githubusercontent.com/94962427/213092314-422f10bb-6285-420c-be93-913e252f75e6.svg",
];

const MatPlacePost: React.FC = () => {
  const [isPost, setIsPost] = useState<boolean>(true);
  const [isPickers, setIsPickers] = useState<boolean>(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const { responseData: pickersData } = useAxios(getPickers, [], false);
  const { responseData: placeData } = useAxios(getPlaceDetail, [], false);

  const {
    id = 0,
    placeImg = "",
    tel = "",
    address = "",
    roadNameAddress = "",
    name = "",
    category = "",
    starAvg = 0,
    starCount = [],
    isPick = true,
    postCount = 0,
    longitude = 0,
    latitude = 0,
    postList = [],
  } = placeData || {};

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const pickMenuHandler = () => {
    setIsPickers(!isPickers);
  };

  const postMenuHandler = () => {
    setIsPost(true);
  };
  const aboutMenuHandler = () => {
    setIsPost(false);
  };

  return (
    <FeedContainer>
      {isOpenModal && (
        <ModalPortal>
          <MatPostCreate onClickToggleModal={onClickToggleModal} />
          <ModalBackdrop onClick={onClickToggleModal} />
        </ModalPortal>
      )}
      <div className="userInfo_header_container">
        <PlaceImg src={placeImg} alt="프로필사진" />
        <PlaceInfo>
          <PlaceName>{name}</PlaceName>
          <InfoBox>{starAvg}</InfoBox>
          <ButtonBox>
            <button onClick={pickMenuHandler}>Pick</button>
            <button onClick={onClickToggleModal}>Post</button>
          </ButtonBox>
          <InfoBox>맛 Pick 사람들이 픽한 횟수 맛 Post {postCount}</InfoBox>
        </PlaceInfo>
      </div>
      {isPickers ? (
        <PickContainer>
          <h3>맛픽커즈를 선택해 주세요</h3>
          {pickersData &&
            pickersData.map((picker: any) => (
              <NameBox key={picker.id} color={groupImg[picker.groupImgIndex]}>
                <div className="icon"></div>
                <div>{picker.name}</div>
              </NameBox>
            ))}
        </PickContainer>
      ) : (
        <>
          <TabContainer>
            <div
              className={`tab_menu ${isPost ? "present" : ""}`}
              onClick={postMenuHandler}
              aria-hidden="true"
            >
              Post
            </div>
            <div
              className={`tab_menu ${!isPost ? "present" : ""}`}
              onClick={aboutMenuHandler}
              aria-hidden="true"
            >
              About
            </div>
          </TabContainer>
          {isPost ? (
            <PageContainer>
              {postList &&
                postList.map((post: any) => (
                  <PostRead key={post.postId} post={post} />
                ))}
            </PageContainer>
          ) : (
            <PlaceDetailInfo>
              <img src={placeImg} alt="프로필사진" />
              <p className="name">{name}</p>
              <p>{category}</p>
              <p>{starAvg}</p>
              <p>{tel}</p>
              <p>
                {address} {roadNameAddress}
              </p>
            </PlaceDetailInfo>
          )}
        </>
      )}
    </FeedContainer>
  );
};

export default MatPlacePost;
