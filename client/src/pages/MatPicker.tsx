import styled from "styled-components";
import { getMatPickers } from "../utils/usePickersAxios";
import { useState, useCallback } from "react";
import { MatPickersList, MatPickerCreate, ModalPortal } from "../components";
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
    background-color: #f8f8f8;
    padding: 15px;
    border: none;
    border-bottom: 1px solid #adadad;
    cursor: pointer;
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
  div {
    font-size: 16px;
  }
`;
const AddCircleOutlineIconStyled = styled(AddCircleOutlineIcon)`
  color: #505050;
`;

const MatPicker: React.FC = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const { pickersData } = getMatPickers();

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <MatPickerWrapper>
      {isOpenModal && (
        <ModalPortal>
          <MatPickerCreate onClickToggleModal={onClickToggleModal} />
        </ModalPortal>
      )}
      <h1>맛픽커즈</h1>
      <MatPickerBox>
        {pickersData &&
          pickersData.map((picker: any) => <MatPickersList key={picker.id} picker={picker} />)}
        <button className="default_mat_pick" onClick={onClickToggleModal}>
          <MatPickerCreateBox>
            <AddCircleOutlineIconStyled className="icon" fontSize="large" />
            <div>그룹 추가하기</div>
          </MatPickerCreateBox>
        </button>
      </MatPickerBox>
    </MatPickerWrapper>
  );
};

export default MatPicker;
