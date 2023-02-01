import styled from "styled-components";
import MatPeoplePickersItem from "../components/MatPeoplePickersItem";
import { useLocation } from "react-router";

const MatPeoplePickerWrapper = styled.div`
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
const StyledMatPickers = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const MatPeoplePicker: React.FC = () => {
  // navigate로 컴포넌트 이동 후 받아온 props
  const { state } = useLocation();

  return (
    <MatPeoplePickerWrapper>
      <h1>맛픽커즈</h1>
      <StyledMatPickers>
        {state &&
          state.map((picker: any) => <MatPeoplePickersItem key={picker.id} picker={picker} />)}
      </StyledMatPickers>
    </MatPeoplePickerWrapper>
  );
};

export default MatPeoplePicker;
