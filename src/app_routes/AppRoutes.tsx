import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/auth_pages/AuthPage";
import Home from "../pages/home/Home";
import Messaging from "../pages/messaging/Messaging";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/chat" element={<Messaging />} />
    </Routes>
  );
};

export default AppRoutes;
