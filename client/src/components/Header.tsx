import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: #ffffff;
  min-height: 57px;
  position: absolute;
  min-width: calc(1340px * 2 / 5 - 63px);
  float: inline-start;
  z-index: 998;
  border-bottom: 1px solid #d7d9dc;
  padding-left: 63px;
  border-right: 1px solid #d7d9dc;
`;

// 비회원 헤더: 로그인 버튼, 회원 헤더: 유저 프로필 버튼

const Header = () => {
  return <HeaderContainer></HeaderContainer>;
};

export default Header;
