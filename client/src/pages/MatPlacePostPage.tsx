import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAxios from "../hooks/useAxios";
import { createPlaces } from "../api/axiosAPI/places/PlacesAxios";

const MatPlacePostWrapper = styled.div`
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
    color: #373737;
    font-size: 25px;
    font-weight: 500;
    margin-top: 100px;
    margin-bottom: 60px;
  }
  h2 {
    margin: 18px 0;
    font-size: 19px;
  }

  input {
    height: 40px;
    width: 300px;
    padding: 10px;
    border: 1px solid #adadad;
    outline: none;
    border-radius: 12px;
    color: #373737;
    font-size: 1rem;
    margin-bottom: 10px;

    &:focus {
      outline: rgb(241, 133, 137, 0.4) solid 3px;
    }
  }
  input::placeholder {
    color: #373737;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 40px;
  button {
    width: 100px;
    background-color: #874356;
    color: #ffffff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 20px;
    height: 40px;
    margin: 0 20px;
  }

  button:hover {
    font-weight: 700;
  }
`;

const CategoryMenuBox = styled.div`
  font-size: 1rem;
  display: flex;
  height: 40px;
  width: 300px;
  padding: 10px;
  border: 1px solid #adadad;
  border-radius: 12px;
  color: #373737;
  font-size: 1rem;
  background-color: white;

  &:hover {
    outline: rgb(241, 133, 137, 0.4) solid 3px;
  }
`;

const DropDownBoxWrap = styled.div`
  width: 300px;
  height: 120px;
  margin-top: 5px;
`;

const DropDownContainer = styled.ul`
  width: 100%;
  height: 100%;
  border: 1px solid #adadad;
  border-radius: 12px;
  background-color: white;
  display: inline-flex;
  flex-direction: column;
  list-style: none;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  list-style: none;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
    font-weight: 700;
  }
`;

const list = [
  {
    index: 0,
    name: "술집",
  },
  {
    index: 1,
    name: "맛집",
  },
  {
    index: 2,
    name: "카페",
  },
  {
    index: 3,
    name: "기타",
  },
];
const MatPlacePostPage = () => {
  const [nameValue, setNameValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [roadValue, setRoadValue] = useState("");
  const [telValue, setTelValue] = useState("");
  const [category, setCategory] = useState("카데고리를 선택하세요");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const onToggle = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setCategory(value);
    setIsOpen(false);
  };

  const hadleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const hadleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value);
  };
  const hadleRoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoadValue(e.target.value);
  };
  const hadleTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelValue(e.target.value);
  };

  const { axiosData } = useAxios(
    () => createPlaces(nameValue, addressValue, roadValue, telValue, category),
    [nameValue, addressValue, roadValue, telValue, category],
    true
  );

  const handlePlacePost = () => {
    if (
      nameValue &&
      addressValue &&
      roadValue &&
      telValue &&
      category !== "카데고리를 선택하세요"
    ) {
      axiosData();
      navigate("/");
    }
  };

  return (
    <MatPlacePostWrapper>
      <h1>새로운 맛플레이스를 소개해 주세요!</h1>
      <label htmlFor="input-title">
        <h2>이름</h2>
      </label>
      <input
        id="input-title"
        placeholder="이름을 입력하세요"
        value={nameValue || ""}
        onChange={(e) => hadleName(e)}
      />
      <label htmlFor="input-title">
        <h2>주소</h2>
      </label>
      <input
        id="input-title"
        placeholder="주소를 입력하세요"
        value={addressValue || ""}
        onChange={(e) => hadleAddress(e)}
      />
      <label htmlFor="input-title">
        <h2>우편번호</h2>
      </label>
      <input
        id="input-title"
        placeholder="우편번호를 입력하세요"
        value={roadValue || ""}
        onChange={(e) => hadleRoad(e)}
      />
      <label htmlFor="input-title">
        <h2>전화번호</h2>
      </label>
      <input
        id="input-title"
        placeholder="전화번호를 입력하세요"
        value={telValue || ""}
        onChange={(e) => hadleTel(e)}
      />
      <h2>카테고리</h2>
      <CategoryMenuBox onClick={onToggle}>
        <p>{category}</p>
      </CategoryMenuBox>
      {isOpen && (
        <DropDownBoxWrap>
          <DropDownContainer>
            {list.map((el) => (
              <ListItem key={el.index} onClick={onOptionClicked(el.name)}>
                {el.name}
              </ListItem>
            ))}
          </DropDownContainer>
        </DropDownBoxWrap>
      )}
      <ButtonContainer>
        <button onClick={handlePlacePost}>확인</button>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </button>
      </ButtonContainer>
    </MatPlacePostWrapper>
  );
};

export default MatPlacePostPage;
