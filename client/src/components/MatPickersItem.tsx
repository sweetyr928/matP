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
    border-radius: 50%;
    margin-right: 20px;
    background: url(${(props) => props.color || "gray"});
    background-size: 100%;
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

const groupImg = [
  "https://user-images.githubusercontent.com/94962427/213089353-0c35dd6b-a40f-46d9-88d0-03b515888bc8.png",
  "https://user-images.githubusercontent.com/94962427/213089385-ef2f1dc2-3192-4aaa-b9fd-aa108ec46675.png",
  "https://user-images.githubusercontent.com/94962427/213089403-2602dbbb-cbc5-4090-825d-636708940b9b.png",
  "https://user-images.githubusercontent.com/94962427/213092314-422f10bb-6285-420c-be93-913e252f75e6.svg",
];

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
