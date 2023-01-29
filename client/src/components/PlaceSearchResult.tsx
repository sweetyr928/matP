import { useNavigate } from "react-router";
import styled from "styled-components";

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
  border-bottom: 1px solid #cdcdcd;
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
  const navigate = useNavigate();
  return (
    <PlaceWrapper>
      <ResultList>
        <PlaceName onClick={() => navigate(`/places/${place.id}`)}>{place.name}</PlaceName>
        <PlaceAddress>{place.address}</PlaceAddress>
      </ResultList>
    </PlaceWrapper>
  );
};

export default PlaceSearchResult;
