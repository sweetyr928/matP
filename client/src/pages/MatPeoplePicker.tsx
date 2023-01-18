import styled from "styled-components";
import { getMatPickers } from "../utils/usePickersAxios";
import MatPeoplePickersList from "../components/MatPeoplePickersList";

const MatPeoplePickerWrapper = styled.div`
  height: 100%;
  min-width: calc(1340px * 2 / 5 - 63px);
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
    margin-top: 200px;
    margin-bottom: 80px;
  }
`;

const StyledMatPickers = styled.div`
  width: 100%;
  height: 100%;

  .default_mat_pick {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 15px;
    border-bottom: 1px solid black;
  }
`;

const MatPeoplePicker: React.FC = () => {
  const { pickersData } = getMatPickers();

  return (
    <MatPeoplePickerWrapper>
      <h1>맛픽커즈</h1>
      <StyledMatPickers>
        {pickersData &&
          pickersData.map((picker) => (
            <MatPeoplePickersList key={picker.id} picker={picker} />
          ))}
      </StyledMatPickers>
    </MatPeoplePickerWrapper>
  );
};

export default MatPeoplePicker;
