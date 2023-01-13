/* eslint-disable */
import { useEffect } from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

// head에 작성한 Kakao API 불러오기
const { kakao } = window as any;

const KakaoMap = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);
  }, []);

  return (
    <MapContainer>
      <div id="map" className="map" style={{ width: "100%", height: "100vh" }}></div>
    </MapContainer>
  );
};

export default KakaoMap;
