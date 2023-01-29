import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledMatPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 15px;
  border-bottom: 1px solid #373737;

  button {
    padding: 0;
    border: none;
    background-color: transparent;
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
    border-radius: 50%;
    margin-right: 20px;
    background: url(${(props) => props.color || "gray"});
    background-size: 100%;
  }
`;

interface PickersProps {
  id: number;
  name: string;
  groupImgIndex: number;
}

const groupImg = [
  "https://user-images.githubusercontent.com/94962427/214733213-a2c51280-6525-49ed-b60c-5e7e248890f8.svg",
  "https://user-images.githubusercontent.com/94962427/214733289-7588880b-0492-429f-9e7e-8dbc883a88a3.svg",
  "https://user-images.githubusercontent.com/94962427/214733318-efc109a4-439d-4b3a-b17e-ab478ff16102.svg",
  "https://user-images.githubusercontent.com/94962427/213092314-422f10bb-6285-420c-be93-913e252f75e6.svg",
];

const MatPeoplePickersItem = ({ picker }: { picker: PickersProps }) => {
  const navigate = useNavigate();
  const move = () => {
    navigate(`/pickers/${picker.id}`, {
      state: {
        name: picker.name,
      },
    });
  };

  return (
    <StyledMatPicker>
      <button onClick={move}>
        <NameBox color={groupImg[picker.groupImgIndex]}>
          <div className="icon"></div>
          <div>{picker.name}</div>
        </NameBox>
      </button>
    </StyledMatPicker>
  );
};

export default MatPeoplePickersItem;
