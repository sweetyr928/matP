import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 63px;
  height: 100vh;
  position: fixed;
  float: left;
  background-color: white;
  z-index: 999;
  border-right: 1px solid #d7d9dc;
`;

const Sidebar = () => {
  // 사이드바 구성 요소: 검색 페이지 버튼, 맛픽커 페이지 버튼
  return <SidebarContainer></SidebarContainer>;
};

export default Sidebar;
