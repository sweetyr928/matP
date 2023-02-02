import { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { getAllPickersPlaces } from "../../api/axiosAPI/groups/PickersAxios";
import useAxios from "../../hooks/useAxios";

const InfoWindowContainer = styled.div`
  width: 2000%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const PlaceName = styled.div`
  padding: 5px;
  font-size: 15px;
  text-align: center;
`;

interface Place {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  groupImgIndex: number;
}
const markerImg = [
  "https://user-images.githubusercontent.com/94962427/215420707-f35b10a7-f81f-40e7-a975-f7938089555f.svg",
  "https://user-images.githubusercontent.com/94962427/214733289-7588880b-0492-429f-9e7e-8dbc883a88a3.svg",
  "https://user-images.githubusercontent.com/94962427/214733318-efc109a4-439d-4b3a-b17e-ab478ff16102.svg",
  "https://user-images.githubusercontent.com/94962427/214733548-640ad950-b4ce-42cd-ad04-7b37eb4eaf8f.svg",
];

const PickerMarker = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Authorization");
  const {
    axiosData: getPickerPlace,
    responseData: pickerPlaces,
    status,
  } = useAxios(getAllPickersPlaces, [token], true);

  const [isVisible, setIsVisible] = useState({
    id: -1,
    isVisible: false,
  });

  const clickHandler = (id: number) => {
    navigate(`/places/${id}`);
  };

  useEffect(() => {
    if (token && pickerPlaces) {
      getPickerPlace();
    }
  }, [token, pickerPlaces]);

  return (
    <>
      {token && status === "Success"
        ? pickerPlaces.map((place: Place) => (
            <MapMarker
              key={place.id}
              image={{
                src: markerImg[place.groupImgIndex],
                size: { width: 25, height: 25 },
              }}
              position={{ lat: place.latitude, lng: place.longitude }}
              clickable={true}
              onMouseOver={() => setIsVisible({ id: place.id, isVisible: true })}
              onMouseOut={() => setIsVisible({ id: -1, isVisible: false })}
              onClick={() => clickHandler(place.id)}
            >
              {isVisible.isVisible && isVisible.id === place.id && (
                <InfoWindowContainer>
                  <PlaceName>{place.name}</PlaceName>
                </InfoWindowContainer>
              )}
            </MapMarker>
          ))
        : null}
    </>
  );
};

export default PickerMarker;
