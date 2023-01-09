import { Link } from "react-router-dom";
import styled from "styled-components";
import mainLogo from "../images/matLogo_basic.png";

const SidebarContainer = styled.div`
  width: 63px;
  height: 100vh;
  position: fixed;
  float: left;
  background-color: white;
  z-index: 999;
  border-right: 1px solid #d7d9dc;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #d7d9dc;
  padding-bottom: 1px;

  .imgSrc {
    display: block;
    width: 55px;
    height: 55px;
    border-radius: 100%;
    &:hover {
      filter: brightness(0.93);
    }
  }
`;

const Sidebar = () => {
  // 사이드바 구성 요소: 검색 페이지 버튼, 맛픽커 페이지 버튼
  return (
    <SidebarContainer>
      <ImageContainer>
        <Link to="/">
          <img className="imgSrc" src={mainLogo} alt="맛피로고" />
        </Link>
      </ImageContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
