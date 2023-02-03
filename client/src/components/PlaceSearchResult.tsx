import { useNavigate } from "react-router";
import styled from "styled-components";
import { IMatPlace } from "../api/axiosAPI/places/PlacesAxios";

const PlaceWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  padding-left: 40px;
  border-bottom: 1px solid #ececec;
  &:hover {
    background-color: #efefef;
  }
`;

const PlaceName = styled.h3`
  cursor: pointer;
  font-size: 1.2rem;
  margin: 7px 0;
  color: #874356;
  &:hover {
    color: #c65d7b;
  }
`;

const PlaceAddress = styled.p`
  font-size: 0.8rem;
  margin-top: 5px;
`;

const PlaceSearchResult = ({ place }: { place: IMatPlace }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/places/${place.id}`);
  };
  return (
    <PlaceWrapper onClick={handleClick}>
      <ResultList>
        <PlaceName onClick={() => navigate(`/places/${place.id}`)}>
          {place.name}
        </PlaceName>
        <PlaceAddress>{place.address}</PlaceAddress>
      </ResultList>
    </PlaceWrapper>
  );
};

export default PlaceSearchResult;
