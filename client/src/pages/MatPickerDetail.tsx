import styled from "styled-components";
import useAxios from "../utils/useAxios";
import { getPickersDetail } from "../utils/axiosAPI/groups/PickersAxios";
import { useParams } from "react-router-dom";

const MatPickPlaceWrapper = styled.div`
  height: 100%;
  min-width: calc(1340px * 2 / 5 - 63px);
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
    margin-top: 200px;
    margin-bottom: 80px;
  }
`;

const MatPickPlaceBox = styled.div`
  width: 100%;
  height: 100%;

  div {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #adadad;
    font-size: 18px;
    cursor: pointer;
  }
`;

const MatPickerDetail: React.FC = () => {
  const { id } = useParams();
  const { responseData } = useAxios(() => getPickersDetail(id), [], false);

  return (
    <MatPickPlaceWrapper>
      <h1>{responseData.name}</h1>
      <MatPickPlaceBox>
        {responseData &&
          responseData.map((pickPlace: any) => (
            <div key={pickPlace.id}>
              {pickPlace.name}|{pickPlace.address}|✭{pickPlace.star}
            </div>
          ))}
      </MatPickPlaceBox>
    </MatPickPlaceWrapper>
  );
};

export default MatPickerDetail;
