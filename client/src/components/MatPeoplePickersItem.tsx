import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMatPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 15px;
  border-bottom: 1px solid #373737;

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
  "https://user-images.githubusercontent.com/94962427/213089353-0c35dd6b-a40f-46d9-88d0-03b515888bc8.png",
  "https://user-images.githubusercontent.com/94962427/213089385-ef2f1dc2-3192-4aaa-b9fd-aa108ec46675.png",
  "https://user-images.githubusercontent.com/94962427/213089403-2602dbbb-cbc5-4090-825d-636708940b9b.png",
  "https://user-images.githubusercontent.com/94962427/213092314-422f10bb-6285-420c-be93-913e252f75e6.svg",
];

const MatPeoplePickersItem = ({ picker }: { picker: PickersProps }) => {
  return (
    <StyledMatPicker>
      <Link to={`/pickers/${picker.id}`}>
        <NameBox color={groupImg[picker.groupImgIndex]}>
          <div className="icon"></div>
          <div>{picker.name}</div>
        </NameBox>
      </Link>
    </StyledMatPicker>
  );
};

export default MatPeoplePickersItem;
