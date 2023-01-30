import styled from "styled-components";
import { IPeopleSearch } from "../api/axiosAPI/search/PeopleSearchAxios";
import { useNavigate } from "react-router";

const UserWrapper = styled.div`
  height: 100%;
  width: 100%;

  .result-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    padding-left: 20px;
    border-bottom: 1px solid #adadad;
  }

  .user_thumbnail {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .text-box {
    width: 80%;
    display: flex;
    flex-direction: row;
  }
  p {
    margin: 10px;
  }
`;

const PeopleSearchResult = ({ people }: { people: IPeopleSearch }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/people/${people.id}`);
  };

  return (
    <>
      <UserWrapper onClick={handleClick}>
        <div className="result-box">
          <img
            src={people.profileUrl}
            alt="thumbnail"
            className="user_thumbnail"
          />
          <div className="text-box">
            <p>{people.nickname}</p>
            <p>{people.memo}</p>
            <p>{people.followers}</p>
          </div>
        </div>
      </UserWrapper>
    </>
  );
};

export default PeopleSearchResult;
