import { useState } from "react";
import { Route, Routes } from "react-router";
import styled from "styled-components";
import "./App.css";
import { KakaoMap, Sidebar, Header, HeaderFeedHide } from "./components";
import { Domain } from "./pages";

const AppContainer = styled.div`
  display: flex;
  .feed_container {
    display: flex;
    flex-direction: column;
  }
  .feed_container_hidden {
    transform: translateX(-100%);
    z-index: -1;
    width: 0;
  }
`;

function App() {
  const [openClose, setOpenClose] = useState<boolean>(false);

  return (
    <AppContainer>
      <Sidebar />
      <div className={`feed_container_${openClose ? "hidden" : ""}`}>
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
      <HeaderFeedHide openClose={openClose} setOpenClose={setOpenClose} />
      <KakaoMap />
    </AppContainer>
  );
}

export default App;
