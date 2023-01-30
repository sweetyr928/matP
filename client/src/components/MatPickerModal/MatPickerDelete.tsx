import { useState } from "react";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import { deletePickers } from "../../api/axiosAPI/groups/PickersAxios";

const ModalContainer = styled.div`
  height: 100%;
  width: calc(1340px * 2 / 5 - 63px);
  z-index: 1000;
`;

const Backdrop = styled.div`
  top: 0;
  left: 0;
  width: calc(1340px * 2 / 5 - 63px);
  height: 100vh;
  position: fixed;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.2);
`;

const DialogBox = styled.dialog`
  top: 280px;
  left: 79px;
  margin: 0;
  width: 370px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: white;
  position: fixed;
  z-index: 10020;
  h3 {
    color: #c65d7b;
    font-size: 20px;
  }

  p {
    font-size: 21px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 40px;
  button {
    cursor: pointer;
    font-size: 17px;
    margin: 0 20px;
    border: none;
    height: 35px;
    width: 80px;
    margin: 0 10px;
    background-color: #874356;
    color: #ffffff;
    border-radius: 30px;
  }

  button:hover {
    font-weight: 700;
  }
`;

interface ModalDefaultType {
  dataReloadHandler: () => void;
  onClickToggleModal: () => void;
  id: number;
}

const MatPickerDelete = ({ dataReloadHandler, onClickToggleModal, id }: ModalDefaultType) => {
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      dataReloadHandler();
      onClickToggleModal();
    }
  };

  const { axiosData } = useAxios(() => deletePickers(id), [deleteClicked], true);

  const handleMatPickDelete = (e: React.MouseEvent) => {
    setDeleteClicked(!deleteClicked);
    axiosData();
    closeModal(e);
  };

  const hadleCancle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  return (
    <ModalContainer>
      <DialogBox>
        <p> 정말 삭제하시겠습니까?</p>
        <ButtonContainer>
          <button onClick={handleMatPickDelete}>예</button>
          <button onClick={hadleCancle}>아니오</button>
        </ButtonContainer>
      </DialogBox>
      <Backdrop onClick={hadleCancle} />
    </ModalContainer>
  );
};

export default MatPickerDelete;
