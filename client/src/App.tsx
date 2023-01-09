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
      <Domain />
      <KakaoMap />
    </AppContainer>
  );
}

export default App;
