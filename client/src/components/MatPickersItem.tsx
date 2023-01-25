import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MatPickerUpdate, MatPickerDelete, ModalPortal } from ".";
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

  a {
    text-decoration: none;
    color: black;
  }
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

const EditIconStyled = styled(EditIcon)`
  color: #505050;
  cursor: pointer;
`;
const DeleteIconStyeld = styled(DeleteIcon)`
  color: #505050;
  cursor: pointer;
`;

interface ModalDefaultType {
  getAllPickers: () => void;
  id: number;
  name: string;
  groupImgIndex: number;
}

const groupImg = ["#098f00", "#09d800", "#023f00"];

const MatPickersItem = ({
  getAllPickers,
  id,
  name,
  groupImgIndex,
}: ModalDefaultType) => {
  const [isOpenUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const onClickToggleUpdateModal = useCallback(() => {
    setOpenUpdateModal(!isOpenUpdateModal);
  }, [isOpenUpdateModal]);

  const onClickToggleDeleteModal = useCallback(() => {
    setOpenDeleteModal(!isOpenDeleteModal);
  }, [isOpenDeleteModal]);

  return (
    <>
      <MatPickerSingleBox>
        {isOpenUpdateModal && (
          <ModalPortal>
            <MatPickerUpdate
              id={id}
              groupImgIndex={groupImgIndex}
              name={name}
              onClickToggleModal={onClickToggleUpdateModal}
              getAllPickers={getAllPickers}
            />
          </ModalPortal>
        )}
        {isOpenDeleteModal && (
          <ModalPortal>
            <MatPickerDelete
              id={id}
              onClickToggleModal={onClickToggleDeleteModal}
              getAllPickers={getAllPickers}
            />
          </ModalPortal>
        )}
        <Link to={`/pickers/${id}`}>
          <NameBox color={groupImg[groupImgIndex]}>
            <div className="icon"></div>
            <div>{name}</div>
          </NameBox>
        </Link>
        <ButtonBox>
          <EditIconStyled
            className={`update_btn${name === "기본 맛픽커즈" ? "_hidden" : ""}`}
            onClick={onClickToggleUpdateModal}
          />
          <DeleteIconStyeld
            className={`delete_btn${name === "기본 맛픽커즈" ? "_hidden" : ""}`}
            onClick={onClickToggleDeleteModal}
          />
        </ButtonBox>
      </MatPickerSingleBox>
    </>
  );
};

export default MatPickersItem;
