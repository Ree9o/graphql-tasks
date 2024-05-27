import "./App.css";
import { GuestRoute, PrivateRoute } from "./AuthRoute";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import SiginIn from "./components/SiginIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<GuestRoute children={<SiginIn />} />} />
        <Route path="/signup" element={<GuestRoute children={<SignUp />} />} />
        <Route path="/" element={<PrivateRoute children={<Main />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
