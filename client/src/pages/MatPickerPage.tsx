import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { MatPickersItem, MatPickerCreate, ModalPortal } from "../components";
import useAxios from "../hooks/useAxios";
import { getPickers, PickersData } from "../api/axiosAPI/groups/PickersAxios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

const jwtToken = localStorage.getItem("Authorization");

const MatPickerWrapper = styled.div`
  height: 100%;
  width: calc(1340px * 2 / 5 - 63px);
  z-index: 997;
  padding: 0px 8px 0px 70px;
  background-color: #f8f8f8;
  border-right: 1px solid #d7d9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  h1 {
    font-size: 28px;
    font-weight: 500;
    margin-top: 120px;
    margin-bottom: 80px;
    color: #373737;
  }
`;

const MatPickerBox = styled.div`
  width: 100%;
  height: 100%;

  .default_mat_pick {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: #f8f8f8;
    padding: 15px;
    border: none;
    border-bottom: 1px solid #adadad;
    cursor: pointer;
    &:hover {
      filter: brightness(0.95);
    }
  }
`;

const MatPickerCreateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  .icon {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    color: #505050;
    &:hover {
      filter: brightness(0.6);
    }
  }
  div {
    font-size: 17px;
  }
  &:hover {
    font-weight: 700;
  }
`;
const AddCircleOutlineIconStyled = styled(AddCircleOutlineIcon)`
  color: #505050;
`;

const MatPicker: React.FC = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [dataReload, setDataReload] = useState<boolean>(false);
  const [pickers, setPickers] = useState<PickersData[]>([]);

  const { axiosData: getAllPickers, responseData: pickersList } = useAxios(
    getPickers,
    [dataReload],
    false
  );

  useEffect(() => {
    axios
      .get(
        "http://ec2-15-165-163-251.ap-northeast-2.compute.amazonaws.com:8080/groups",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((res) => setPickers(res.data))
      .catch(function (error) {
        throw error;
      });
  }, [dataReload]);

  useEffect(() => {
    getAllPickers();
    setPickers(pickersList);
  }, [dataReload]);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const dataReloadHandler = () => {
    setDataReload(!dataReload);
  };

  return (
    <MatPickerWrapper>
      {isOpenModal && (
        <ModalPortal>
          <MatPickerCreate
            onClickToggleModal={onClickToggleModal}
            dataReloadHandler={dataReloadHandler}
          />
        </ModalPortal>
      )}
      <h1>맛픽커즈</h1>
      <MatPickerBox>
        {pickers &&
          pickers.map((picker: PickersData) => (
            <MatPickersItem
              key={picker.id}
              id={picker.id}
              name={picker.name}
              groupImgIndex={picker.groupImgIndex}
              dataReloadHandler={dataReloadHandler}
            />
          ))}
        <button className="default_mat_pick" onClick={onClickToggleModal}>
          <MatPickerCreateBox>
            <AddCircleOutlineIconStyled className="icon" fontSize="large" />
            <div>그룹 추가하기</div>
          </MatPickerCreateBox>
        </button>
      </MatPickerBox>
    </MatPickerWrapper>
  );
};

export default MatPicker;
