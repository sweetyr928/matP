import styled from "styled-components";
import useAxios from "../hooks/useAxios";
import { getPickersDetail } from "../api/axiosAPI/groups/PickersAxios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const MatPickPlaceWrapper = styled.div`
  height: 100%;
  width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 0px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  h1 {
    font-size: 28px;
    font-weight: 500;
    margin-top: 120px;
    margin-bottom: 80px;
    color: #373737;
  }
`;

const MatPickPlaceList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  .notice {
    margin-top: 170px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
  }
`;

const MatPickPlaceItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90px;
  border-bottom: 1px solid #ececec;
  color: #373737;
  font-size: 16px;
  padding: 10px 30px;
  cursor: pointer;
  &:hover {
    background-color: #efefef;
  }
  h2 {
    font-size: 1.2rem;
    margin: 7px 0;
    color: #874356;
    &:hover {
      color: #c65d7b;
    }
  }
  p {
    font-size: 0.8rem;
    margin-top: 5px;
  }
`;

// 각 맛픽커즈 그룹 데이터가 어떻게 오느냐에 따라 달라질 가능성 높음 (보류)

const MatPickerDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { responseData } = useAxios(
    () => getPickersDetail(Number(id)),
    [],
    false
  );

  const location = useLocation();
  const name = location.state.name;

  return (
    <MatPickPlaceWrapper>
      <h1>{name}</h1>
      <MatPickPlaceList>
        {responseData && responseData.length !== 0 ? (
          responseData.map((pickPlace: any) => (
            <MatPickPlaceItem
              onClick={() => {
                navigate(`/places/${pickPlace.id}`);
              }}
              key={pickPlace.id}
            >
              <h2>{pickPlace.name}</h2>
              <p>{pickPlace.address}</p>
            </MatPickPlaceItem>
          ))
        ) : (
          <p className="notice">현재 지정된 맛플레이스가 없습니다 :(</p>
        )}
      </MatPickPlaceList>
    </MatPickPlaceWrapper>
  );
};

export default MatPickerDetail;
