import { Link } from "react-router-dom";
import styled from "styled-components";
import mainLogo from "../assets/images/matLogo_basic.png";
import SearchIcon from "@mui/icons-material/Search";
import RoomIcon from "@mui/icons-material/Room";
import { placeInfoState, placeInfoStatusState } from "../store/placeInfoAtoms";
import { useSetRecoilState } from "recoil";
import { searchResultsState, searchStatusState } from "../store/searchPlaceAtoms";
import { curruntLocationPlacesState } from "../store/curruntLocationPlacesAtom";

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    color: #373737;
  }
`;

const SearchIconStyled = styled(SearchIcon)`
  color: #505050;
  transform: scale(2);
`;
const RoomIconStyled = styled(RoomIcon)`
  color: #505050;
  transform: scale(2);
`;

const Sidebar = () => {
  const setPlaceInfo = useSetRecoilState(placeInfoState);
  const setPlaceInfoStatus = useSetRecoilState(placeInfoStatusState);
  const setSearchResults = useSetRecoilState(searchResultsState);
  const setSearchStatus = useSetRecoilState(searchStatusState);
  const setCurruntLocaionPlace = useSetRecoilState(curruntLocationPlacesState);

  const resetStateHandler = () => {
    setPlaceInfoStatus("Idle");
    setSearchStatus("Idle");
    setPlaceInfo({
      id: -1,
      tel: "",
      img: "",
      address: "",
      zonecode: "",
      name: "",
      category: "",
      starAvg: 0,
      starCount: [],
      fiveStarProbability: "",
      postCount: 0,
      pickCount: 0,
      isPick: false,
      groupName: null,
      groupImgIndex: 0,
      longitude: null,
      latitude: null,
      posts: [],
    });
    setSearchResults([]);
    setCurruntLocaionPlace([]);
  };

  return (
    <SidebarContainer>
      <ImageContainer>
        <Link to="/" onClick={resetStateHandler}>
          <img className="imgSrc" src={mainLogo} alt="맛피로고" />
        </Link>
      </ImageContainer>
      <MenuContainer>
        <Link to="/search" onClick={resetStateHandler}>
          <SearchIconStyled />
        </Link>
        <Link to="/pickers" onClick={resetStateHandler}>
          <RoomIconStyled />
        </Link>
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
