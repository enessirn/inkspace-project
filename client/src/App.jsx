import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Discovery from "./pages/Discovery";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import UnknownPage from "./pages/UnknownPage";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Discovery />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="*" element={<UnknownPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
