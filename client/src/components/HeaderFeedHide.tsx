/* eslint-disable */

import React, { useCallback } from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
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
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
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

  return <ButtonContainer onClick={onToggle}>{visible ? ">" : "<"}</ButtonContainer>;
};

export default HeaderFeedHide;
