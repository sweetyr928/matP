/* eslint-disable */

import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 411px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 62px;
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
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

const MatPickerUpdate = ({
  onClickToggleModal,
}: PropsWithChildren<ModalDefaultType>) => {
  return (
    <ModalContainer>
      <DialogBox></DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
};

export default MatPickerUpdate;
