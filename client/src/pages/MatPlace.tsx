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

  .star_rating {
    color: #989898;
    position: relative;
    unicode-bidi: bidi-override;
    width: max-content;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1.3px;
    -webkit-text-stroke-color: #fcc419;
    margin: 0px 10px 0px 0px;
  }

  .star_rating_fill {
    color: #fcc419;
    padding: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    top: 0;
    left: 0;
    overflow: hidden;
    -webkit-text-fill-color: #fcc419;
  }

  .star_rating_base {
    z-index: 0;
    padding: 0;
  }
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
    border: 1px solid black;
    border-radius: 50%;
    margin-right: 20px;
    background-color: ${(props) => props.color || "gray"};
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

const RatingsChart = styled.div`
  .card {
    padding: 30px 30px 20px 30px;
  }

  .rating-label {
    font-weight: bold;
    font-size: 15px;
  }

  .rating-box {
    width: 130px;
    height: 130px;
    margin-right: auto;
    margin-left: auto;
    background-color: #fcc419;
    color: #fff;
  }

  .rating-label {
    font-weight: bold;
  }

  /* Rating bar width */
  .rating-bar {
    width: 300px;
    padding: 4px;
    border-radius: 5px;
  }

  /* The bar container */
  .bar-container {
    width: 100%;
    background-color: #f1f1f1;
    text-align: center;
    color: white;
    border-radius: 20px;
  }

  /* Individual bars */
  .bar {
    height: 13px;
    background-color: #fcc419;
    border-radius: 20px;
  }

  td {
    padding: 0px 0px 8px 0px;
  }

  .rating-count {
    font-size: 15px;
  }
`;

const groupImg = ["#098f00", "#09d800", "#023f00"];

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

  // 평점 매긴 유저 수 총합
  const ratingsTotal = starCount.reduce(
    (acc: number, cur: number) => (acc += cur),
    0
  );

  // star rating percentage 계산 후 style로 반영
  const ratingToPercent = {
    width: `${(starAvg / 5) * 100}%`,
  };

  const pickMenuHandler = () => {
    setIsPickers(!isPickers);
  };

  const postMenuHandler = () => {
    setIsPost(true);
  };

  const aboutMenuHandler = () => {
    setIsPost(false);
  };

  const ratingsAvg = (el: number) => (el / ratingsTotal) * 100;

  return (
    <FeedContainer>
      {isOpenModal && (
        <ModalPortal>
          <MatPostCreate onClickToggleModal={onClickToggleModal} />
        </ModalPortal>
      )}
      <div className="userInfo_header_container">
        <PlaceImg src={placeImg} alt="프로필사진" />
        <PlaceInfo>
          <PlaceName>{name}</PlaceName>
          <InfoBox>
            <div className="star_rating">
              <div className="star_rating_fill" style={ratingToPercent}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <div className="star_rating_base">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <div>{`(${starAvg})`}</div>
          </InfoBox>
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
                  <PostRead key={post.id} post={post} />
                ))}
            </PageContainer>
          ) : (
            <PlaceDetailInfo>
              {/* <img src={placeImg} alt="프로필사진" /> */}
              <RatingsChart>
                <div className="card">
                  <table>
                    <tbody>
                      <tr>
                        <td className="rating-label">Excellent</td>
                        <td className="rating-bar">
                          <div className="bar-container">
                            <div
                              className="bar"
                              style={{ width: `${ratingsAvg(starCount[4])}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="rating-count">{starCount[4]}</td>
                      </tr>
                      <tr>
                        <td className="rating-label">Good</td>
                        <td className="rating-bar">
                          <div className="bar-container">
                            <div
                              className="bar"
                              style={{ width: `${ratingsAvg(starCount[3])}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="rating-count">{starCount[3]}</td>
                      </tr>
                      <tr>
                        <td className="rating-label">Average</td>
                        <td className="rating-bar">
                          <div className="bar-container">
                            <div
                              className="bar"
                              style={{ width: `${ratingsAvg(starCount[2])}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="rating-count">{starCount[2]}</td>
                      </tr>
                      <tr>
                        <td className="rating-label">Poor</td>
                        <td className="rating-bar">
                          <div className="bar-container">
                            <div
                              className="bar"
                              style={{ width: `${ratingsAvg(starCount[1])}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="rating-count">{starCount[1]}</td>
                      </tr>
                      <tr>
                        <td className="rating-label">Terrible</td>
                        <td className="rating-bar">
                          <div className="bar-container">
                            <div
                              className="bar"
                              style={{ width: `${ratingsAvg(starCount[0])}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="rating-count">{starCount[0]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </RatingsChart>
              <p className="name">{name}</p>
              <p>{category}</p>
              <InfoBox>
                <div className="star_rating">
                  <div className="star_rating_fill" style={ratingToPercent}>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                  <div className="star_rating_base">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
                <div>{`(${starAvg})`}</div>
              </InfoBox>
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
