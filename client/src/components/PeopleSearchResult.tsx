import styled from "styled-components";

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
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .text-box {
    width: 80%;
  }
  p {
    margin: 10px;
  }
`;

interface PeopleProps {
  userId: number;
  name: string;
  followers: number;
  memo: string;
  thumbnail_url: string;
}

const PeopleSearchResult = ({ people }: { people: PeopleProps }) => {
  return (
    <>
      <UserWrapper>
        <div className="result-box">
          <img src={people.thumbnail_url} alt="thumbnail" className="user_thumbnail" />
          <div className="text-box">
            <p>{people.name}</p>
            <p>{people.memo}</p>
            <p>{people.followers}</p>
          </div>
        </div>
      </UserWrapper>
    </>
  );
};

export default PeopleSearchResult;
