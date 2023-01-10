/* eslint-disable */
import { useState } from "react";
import { Route, Routes } from "react-router";
import styled from "styled-components";
import "./App.css";
import { KakaoMap, Sidebar, Header, HeaderFeedHide } from "./components";
import { Domain } from "./pages";

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
    <AppContainer toggle={visible}>
      <Sidebar />
      <div className={`feed_container_${visible ? "hidden" : ""}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Domain />} />
          {/* <Route path="/" element={<Domain />} /> */}
          {/* <Route path="/" element={<Domain />} /> */}
          {/* <Route path="/" element={<Domain />} /> */}
          {/* <Route path="/" element={<Domain />} /> */}
          {/* <Route path="/" element={<Domain />} /> */}
          {/* <Route path="/" element={<Domain />} /> */}
          {/* <Route path="/" element={<Domain />} /> */}
          {/* <Route path="/" element={<Domain />} /> */}
        </Routes>
      </div>
      <HeaderFeedHide visible={visible} setVisibility={setVisibility} />
      <KakaoMap />
    </AppContainer>
  );
}

export default App;
