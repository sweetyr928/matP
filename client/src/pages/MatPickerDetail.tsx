import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
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
    border-bottom: 1px solid black;
    font-size: 20px;
  }
`;

interface PickPlaces {
  id: number;
  name: string;
  address: string;
  star: number;
}

interface Pickers {
  id: number;
  name: string;
  color: string;
  pickPlaces: Array<PickPlaces>;
}

const MatPickerDetail: React.FC = () => {
  const { id } = useParams();
  const [pickersTitle, setPickersTitle] = useState("");
  const [pickPlaces, setPickPlace] = useState<PickPlaces[]>([]);

  useEffect(() => {
    try {
      axios.get<Pickers>(`http://localhost:3001/groups/${id}`).then((res) => {
        console.log(res.data);
        setPickersTitle(res.data.name);
        setPickPlace(res.data.pickPlaces);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <MatPickPlaceWrapper>
      <h1>{pickersTitle}</h1>
      <MatPickPlaceBox>
        {pickPlaces &&
          pickPlaces.map((pickPlace) => (
            <div key={pickPlace.id}>
              {pickPlace.name}|{pickPlace.address}|✭{pickPlace.star}
            </div>
          ))}
      </MatPickPlaceBox>
    </MatPickPlaceWrapper>
  );
};

export default MatPickerDetail;
