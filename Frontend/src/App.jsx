import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Body from "./components/body";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/body" element={<Body/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
