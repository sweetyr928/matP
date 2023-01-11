/* eslint-disable */
import { useState, useCallback } from "react";
import styled from "styled-components";
import MatPickerUpdate from "./MatPickerModal/MatPickerUpdate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MatPickerSingleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 15px;
  border-bottom: 1px solid black;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
  button {
    background-color: transparent;
  }
  .icon {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    border-radius: 50%;
    margin-right: 20px;
    background-color: ${(props) => props.color || "gray"};
  }
`;

const ButtonBox = styled.div`
  * {
    margin-right: 8px;
  }
  .update_btn_hidden {
    display: none;
  }
  .delete_btn_hidden {
    display: none;
  }
`;

interface PickersProps {
  groupId: number;
  name: string;
  color: string;
}

const MatPickersList = ({ picker }: { picker: PickersProps }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <>
      <MatPickerSingleBox>
        {isOpenModal && (
          <MatPickerUpdate onClickToggleModal={onClickToggleModal} />
        )}
        <NameBox color={picker.color}>
          <div className="icon"></div>
          <div>{picker.name}</div>
        </NameBox>
        <ButtonBox>
          <EditIcon
            className={`update_btn${
              picker.name === "기본 맛픽커즈" ? "_hidden" : ""
            }`}
            onClick={onClickToggleModal}
          />

          <DeleteIcon
            className={`delete_btn${
              picker.name === "기본 맛픽커즈" ? "_hidden" : ""
            }`}
          />
        </ButtonBox>
      </MatPickerSingleBox>
    </>
  );
};

export default MatPickersList;
