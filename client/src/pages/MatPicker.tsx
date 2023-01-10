/* eslint-disable */

import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { MatPickersList } from "../components";

const MatPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 92%;
  /* height: 100vh; */
  min-width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding-left: 63px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;

  h1 {
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 20px;
  }
`;

const MatPickerBox = styled.div`
  width: 300px;
  height: 400px;
  border: 2px solid black;
  border-radius: 20px;
`;

interface Pickers {
  groupId: number;
  name: string;
  color: string;
}

const MatPicker: React.FC = () => {
  const [pickers, setPickers] = useState<Pickers[]>([]);

  useEffect(() => {
    try {
      axios.get<Pickers[]>("http://localhost:3001/groups").then((res) => {
        console.log(res.data);
        setPickers(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <MatPickerWrapper>
      <h1>맛픽커즈</h1>
      <MatPickerBox>
        {pickers &&
          pickers.map((picker) => (
            <MatPickersList key={picker.groupId} picker={picker} />
          ))}
      </MatPickerBox>
    </MatPickerWrapper>
  );
};

export default MatPicker;
