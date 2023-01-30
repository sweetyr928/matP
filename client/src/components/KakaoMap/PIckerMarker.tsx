import { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { searchResultsState, searchStatusState } from "../../store/searchPlaceAtoms";
import { placeInfoState, placeInfoStatusState } from "../../store/placeInfoAtoms";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import { userInfoState } from "../../store/userInfoAtoms";
import { getPickersDetail } from "../../api/axiosAPI/groups/PickersAxios";
import useAxios from "../../hooks/useAxios";

const InfoWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* min-width: 200px; */
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  /* border-radius: 10px; */
  border: 1px soild #505050;
  z-index: 10000;

  .close-btn {
    position: absolute;
    right: 0;
    cursor: pointer;
  }
`;

const markerImg = [
  "https://user-images.githubusercontent.com/94962427/214733213-a2c51280-6525-49ed-b60c-5e7e248890f8.svg",
  "https://user-images.githubusercontent.com/94962427/214733289-7588880b-0492-429f-9e7e-8dbc883a88a3.svg",
  "https://user-images.githubusercontent.com/94962427/214733318-efc109a4-439d-4b3a-b17e-ab478ff16102.svg",
  "https://user-images.githubusercontent.com/94962427/214733548-640ad950-b4ce-42cd-ad04-7b37eb4eaf8f.svg",
];

const PickerMarker = () => {
  const token = localStorage.getItem("Authorization");
  const userInfo = useRecoilValue(userInfoState);
  const groupInfo = userInfo.pickerGroupInfos;
  const [id, setId] = useState(-1);
  const [skip, setSkip] = useState(true);
  const [wholePickerPlace, setWholePickerPlace] = useState({});
  const { axiosData: getPickerDetail, responseData: pickersData } = useAxios(
    () => getPickersDetail(id),
    [],
    skip
  );

  useEffect(() => {
    if (token && userInfo) {
      setSkip(false);
      console.log(groupInfo);
      for (let i = 0; i < groupInfo.length; i++) {
        setId(groupInfo[i].id);
        // getPickerDetail();
        console.log(groupInfo[i].id);

        // setWholePickerPlace(Object.assign()wholePickerPlace.assign)
      }
    }
    setSkip(true);
  }, [token, userInfo]);

  const [isVisible, setIsVisible] = useState(false);

  // image={{
  //   src: markerImg[result.postCount],
  //   size: { width: 25, height: 25 },
  // }}
  return (
    <>
      {/* {token && userInfo.groupImgIndex === 0
        ? searchResults.map((result) => (
            <MapMarker
              key={result.id}
              position={{ lat: result.latitude, lng: result.longitude }}
              clickable={true}
              onMouseOver={() => setIsVisible({ id: result.id, isVisible: true })}
              onMouseOut={() => setIsVisible({ id: -1, isVisible: false })}
              onClick={() => clickHandler(result.id)}
            >
              {isVisible.isVisible && isVisible.id === result.id && (
                <InfoWindowContainer>
                  <PlaceName>{result.name}</PlaceName>
                </InfoWindowContainer>
              )}
            </MapMarker>
          ))
        : null} */}
    </>
  );
};

export default PickerMarker;
