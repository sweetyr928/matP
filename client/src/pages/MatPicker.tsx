import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { MatPickersList, MatPickerCreate } from "../components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MatPickerWrapper = styled.div`
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

const MatPickerBox = styled.div`
  width: 100%;
  height: 100%;

  .default_mat_pick {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 15px;
    border-bottom: 1px solid black;
  }
`;

const MatPickerCreateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px;
  .icon {
    width: 30px;
    height: 30px;
    margin-right: 20px;
  }
`;

interface Pickers {
  id: number;
  name: string;
  color: string;
}

const MatPicker: React.FC = () => {
  const [pickers, setPickers] = useState<Pickers[]>([]);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

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
      {isOpenModal && (
        <MatPickerCreate onClickToggleModal={onClickToggleModal} />
      )}
      <h1>맛픽커즈</h1>
      <MatPickerBox>
        {pickers &&
          pickers.map((picker) => (
            <MatPickersList key={picker.id} picker={picker} />
          ))}
        <div className="default_mat_pick">
          <MatPickerCreateBox onClick={onClickToggleModal}>
            <AddCircleOutlineIcon className="icon" fontSize="large" />
            <div>그룹 추가하기</div>
          </MatPickerCreateBox>
        </div>
      </MatPickerBox>
    </MatPickerWrapper>
  );
};

export default MatPicker;
