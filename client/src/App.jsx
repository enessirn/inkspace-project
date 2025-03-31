import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Discovery from "./pages/Discovery";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Discovery />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      </BrowserRouter>
    
    </>

  );
}

export default App;
