import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMatPicker = styled.div`
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

interface PickersProps {
  id: number;
  name: string;
  color: string;
}

const MatPeoplePickersList = ({ picker }: { picker: PickersProps }) => {
  return (
    <StyledMatPicker>
      <Link to={`/pickers/${picker.id}`}>
        <NameBox color={picker.color}>
          <div className="icon"></div>
          <div>{picker.name}</div>
        </NameBox>
      </Link>
    </StyledMatPicker>
  );
};

export default MatPeoplePickersList;
