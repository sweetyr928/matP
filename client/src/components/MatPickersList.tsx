/* eslint-disable */
import styled from "styled-components";

const MatPickerSingleBox = styled.div`
  width: 100%;
  height: 50px;
  padding: 15px;
  border-bottom: 1px solid black;
`;

interface PickersProps {
  groupId: number;
  name: string;
  color: string;
}

const MatPickersList = ({ picker }: { picker: PickersProps }) => {
  return (
    <>
      <MatPickerSingleBox>
        <span>{picker.name}</span>
        <span>수정 버튼</span>
        <span>삭제 버튼</span>
      </MatPickerSingleBox>
    </>
  );
};

export default MatPickersList;
