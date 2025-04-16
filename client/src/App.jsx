import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Discovery from "./pages/Discovery";
import CreatePost from "./pages/CreatePost";


import Profile from "./pages/Profile";

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Discovery />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
