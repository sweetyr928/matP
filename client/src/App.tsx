/* eslint-disable */
import { useState } from "react";
import { Route, Routes } from "react-router";
import styled from "styled-components";
import "./App.css";
import { KakaoMap, Sidebar, Header, HeaderFeedHide } from "./components";
import {
  Domain,
  MyPage,
  MatPeople,
  MatPicker,
  MatPickerDetail,
  SearchPage,
  SearchDetailPage,
  MatPlace,
  MatPlacePostPage,
  MatPeoplePickerPage,
  NotFoundPage,
  LoginPage,
} from "./pages";
import { RecoilRoot } from "recoil";

interface AppContainerProps {
  toggle: boolean;
}

const AppContainer = styled.div<AppContainerProps>`
  display: flex;
  .feed_container {
    display: flex;
    flex-direction: column;
    transition: 0.3s ease-in-out;
  }
  .feed_container_hidden {
    transform: translateX(-100%);
    z-index: -1;
    /* width: 0; */
    transition: 0.3s ease-in-out;
  }
`;

function App() {
  const [visible, setVisibility] = useState<boolean>(false);

  return (
    <RecoilRoot>
      <AppContainer toggle={visible}>
        <Sidebar />
        <div className={`feed_container_${visible ? "hidden" : ""}`}>
          <Header />
          <Routes>
            <Route path="/" element={<Domain />} />
            <Route path="/pickers" element={<MatPicker />} />
            <Route path="/pickers/:id" element={<MatPickerDetail />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:name" element={<SearchDetailPage />} />
            <Route path="/newplaces" element={<MatPlacePostPage />} />
            <Route path="/places/:id" element={<MatPlace />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/people" element={<MatPeople />} />
            <Route path="/matPickers" element={<MatPeoplePickerPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <HeaderFeedHide visible={visible} setVisibility={setVisibility} />
        <KakaoMap />
      </AppContainer>
    </RecoilRoot>
  );
}

export default App;
