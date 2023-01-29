import styled from "styled-components";

const UserWrapper = styled.div`
  height: 100%;
  width: 100%;

  .result-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    padding-left: 20px;
    border-bottom: 1px solid #adadad;
  }

  /* .user_thumbnail {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 10px;
  } */

  .text-box {
    width: 80%;
  }
  p {
    margin: 10px;
  }
`;

interface PlaceProps {
  id: number;
  tel: string;
  address: string;
  name: string;
  starAvg: number;
  postCount: number;
  longitude: number;
  latitude: number;
}

const PlaceSearchResult = ({ place }: { place: PlaceProps }) => {
  return (
    <>
      <UserWrapper>
        <div className="result-box">
          <div className="text-box">
            <p>{place.name}</p>
            <p>{place.address}</p>
            <p>{place.tel}</p>
          </div>
        </div>
      </UserWrapper>
    </>
  );
};

export default PlaceSearchResult;
