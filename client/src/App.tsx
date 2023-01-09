import { Route, Routes } from "react-router";
import styled from "styled-components";
import "./App.css";
import { KakaoMap, Sidebar } from "./components";
import { Domain } from "./pages";

const AppContainer = styled.div`
  display: flex;
`;

function App() {
  return (
    <AppContainer>
      <Sidebar />
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
      <KakaoMap />
    </AppContainer>
  );
}

export default App;
