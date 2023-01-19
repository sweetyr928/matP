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
  border-bottom: 1px solid #adadad;

  a {
    text-decoration: none;
    color: #373737;
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
    border: 1px solid #505050;
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

interface PickersProps {
  id: number;
  name: string;
  color: string;
}

const MatPickersList = ({ picker }: { picker: PickersProps }) => {
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
              id={picker.id}
              color={picker.color}
              name={picker.name}
              onClickToggleModal={onClickToggleUpdateModal}
            />
          </ModalPortal>
        )}
        {isOpenDeleteModal && (
          <ModalPortal>
            <MatPickerDelete id={picker.id} onClickToggleModal={onClickToggleDeleteModal} />
          </ModalPortal>
        )}
        <Link to={`/pickers/${picker.id}`}>
          <NameBox color={picker.color}>
            <div className="icon"></div>
            <div>{picker.name}</div>
          </NameBox>
        </Link>
        <ButtonBox>
          <EditIconStyled
            className={`update_btn${picker.name === "기본 맛픽커즈" ? "_hidden" : ""}`}
            onClick={onClickToggleUpdateModal}
          />

          <DeleteIconStyeld
            className={`delete_btn${picker.name === "기본 맛픽커즈" ? "_hidden" : ""}`}
            onClick={onClickToggleDeleteModal}
          />
        </ButtonBox>
      </MatPickerSingleBox>
    </>
  );
};

export default MatPickersList;
