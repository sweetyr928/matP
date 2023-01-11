import React, { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalContainer = styled.div`
  top: 57px;
  left: 62px;
  width: 411px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

const DialogBox = styled.dialog`
  top: 267px;
  width: 370px;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;

  h3 {
    margin: 40px 0;
    font-size: 25px;
  }

  input {
    height: 40px;
    width: 300px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 20px;
  }
`;

const TabContainer = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  width: 300px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;
`;
const TabButton = styled.li`
  height: 30px;
  width: 30px;
  list-style: none;
  border-radius: 20px;
  background-color: ${(props) => props.color || "gray"};
  border: ${(props) =>
    props.id === "focused" ? "3px solid red" : "1px solid black"};
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 40px;
  button {
    height: 40px;
    width: 60px;
    margin: 0 20px;
    border: 1px solid black;
    border-radius: 20px;
  }
`;

interface ModalDefaultType {
  onClickToggleModal: () => void;
  id: number;
  name: string;
  color: string;
}

const tabs = [
  { index: 1, color: "#098f00" },
  { index: 2, color: "#09d800" },
  { index: 3, color: "#023f00" },
];
const MatPickerUpdate = ({
  onClickToggleModal,
  id,
  color,
  name,
}: PropsWithChildren<ModalDefaultType>) => {
  const [newColorValue, setNewColorValue] = useState(color);
  const [newNameValue, setNewNameValue] = useState(name);

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  const handleName = (e: any) => {
    setNewNameValue(e.target.value);
  };

  const handleMatPickPatch = () => {
    if (newNameValue && newColorValue) {
      updateMatPickers(id, newNameValue, newColorValue);
    }
  };

  const updateMatPickers = async (id: number, name: string, color: string) => {
    await axios
      .patch(`http://localhost:3001/groups/${id}`, {
        name,
        color,
      })
      .then(() => {
        window.location.replace("/pickers");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <ModalContainer>
      <DialogBox>
        <label htmlFor="input-title">
          <h3>맛픽커즈 이름</h3>
        </label>
        <input
          id="input-title"
          placeholder="이름을 입력하세요"
          value={newNameValue}
          onChange={(e) => handleName(e)}
        />
        <h3>맛픽커즈 색상</h3>
        <TabContainer>
          {tabs.map((el) => (
            <TabButton
              key={el.index}
              id={el.color === newColorValue ? "focused" : ""}
              color={el.color}
              onClick={() => {
                setNewColorValue(el.color);
              }}
            />
          ))}
        </TabContainer>
        <ButtonContainer>
          <button onClick={handleMatPickPatch}>수정</button>
          <button onClick={closeModal}>취소</button>
        </ButtonContainer>
      </DialogBox>
      <Backdrop onClick={closeModal} />
    </ModalContainer>
  );
};

export default MatPickerUpdate;
