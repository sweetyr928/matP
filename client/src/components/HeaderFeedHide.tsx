/* eslint-disable */

import React from "react";
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
  left: 472px;
  top: 45%;
  z-index: 100;
`;

interface OpenCloseProps {
  openClose: boolean;
  setOpenClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderFeedHide = ({ openClose, setOpenClose }: OpenCloseProps) => {
  const changeOpenClose = () => {
    setOpenClose(!openClose);
  };
  return <ButtonContainer onClick={changeOpenClose}>{openClose ? ">" : "<"}</ButtonContainer>;
};

export default HeaderFeedHide;
