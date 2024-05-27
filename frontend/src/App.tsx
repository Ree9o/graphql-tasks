import "./App.css";
import { GuestRoute, PrivateRoute } from "./libs/AuthRoute";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import SiginIn from "./components/SiginIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import client from "./libs/apollo.client";
import { ApolloProvider } from "@apollo/client";
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<GuestRoute children={<SiginIn />} />} />
          <Route path="/signup" element={<GuestRoute children={<SignUp />} />} />
          <Route path="/" element={<PrivateRoute children={<Main />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
