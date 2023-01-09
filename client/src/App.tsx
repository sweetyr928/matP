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
`;

function App() {
  return (
    <AppContainer>
      <Sidebar />
      <div className="feed_container">
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
      <HeaderFeedHide />
      <KakaoMap />
    </AppContainer>
  );
}

export default App;
