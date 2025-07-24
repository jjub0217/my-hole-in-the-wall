import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./components/Main/MainPage";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
        </Route> */}
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
