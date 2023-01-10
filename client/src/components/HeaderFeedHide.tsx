/* eslint-disable */

import React, { useCallback } from "react";
import styled from "styled-components";

interface ButtonContainerProps {
  toggle: boolean;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  min-width: 22px;
  min-height: 49px;
  height: 29px;
  align-items: center;
  background-color: #fff;
  border-radius: 0 5px 5px 0;
  border: 1px solid #d7d9dc;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 45%;
  z-index: 100;
  left: ${(props) => (props.toggle ? "62px" : "472px")};
  /* transition: 0.3s ease-in-out; */
`;

interface VisibleProps {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderFeedHide = ({ visible, setVisibility }: VisibleProps) => {
  const onToggle = useCallback(
    (e: any) => {
      setVisibility(!visible);
    },
    [visible]
  );

  return (
    <ButtonContainer onClick={onToggle} toggle={visible}>
      {visible ? ">" : "<"}
    </ButtonContainer>
  );
};

export default HeaderFeedHide;
