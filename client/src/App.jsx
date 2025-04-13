import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Discovery from "./pages/Discovery";
import CreatePost from "./pages/CreatePost";

import { GetMeProvider } from "./context/GetMeContext";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <GetMeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Discovery />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/create-post" element={<CreatePost />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </BrowserRouter>
      </GetMeProvider>
    </>
  );
}

export default App;
