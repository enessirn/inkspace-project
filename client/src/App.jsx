import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Discovery from "./pages/Discovery";

import { GetMeProvider } from "./context/GetMeContext";

function App() {
  return (
    <>
      <GetMeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Discovery />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </GetMeProvider>
    </>
  );
}

export default App;
