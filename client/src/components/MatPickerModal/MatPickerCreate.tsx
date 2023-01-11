/* eslint-disable */
import React, { useState, PropsWithChildren } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalContainer = styled.div`
  width: 411px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

const DialogBox = styled.dialog`
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
  border: solid 1px black;
  border-radius: 20px;
  background-color: ${(props) => props.color || "gray"};
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
}

const tabs = [
  { index: 1, color: "#098f00" },
  { index: 2, color: "#09d800" },
  { index: 3, color: "#023f00" },
];

const MatPickerCreate = ({
  onClickToggleModal,
}: PropsWithChildren<ModalDefaultType>) => {
  const [colorValue, setColorValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  const hadleName = (e: any) => {
    setNameValue(e.target.value);
  };

  const handleMatPickPost = () => {
    if (nameValue && colorValue) {
      addMatPickers(nameValue, colorValue);
    }
  };

  const addMatPickers = async (name: string, color: string) => {
    await axios
      .post("http://localhost:3001/groups", {
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
          value={nameValue || ""}
          onChange={(e) => hadleName(e)}
        />
        <h3>맛픽커즈 색상</h3>
        <TabContainer>
          {tabs.map((el) => (
            <TabButton
              key={el.index}
              color={el.color}
              onClick={() => {
                setColorValue(el.color);
              }}
            />
          ))}
        </TabContainer>
        <ButtonContainer>
          <button onClick={handleMatPickPost}>확인</button>
          <button onClick={closeModal}>취소</button>
        </ButtonContainer>
      </DialogBox>
      <Backdrop onClick={closeModal} />
    </ModalContainer>
  );
};

export default MatPickerCreate;
