import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/errorPages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AuthenticatedAppHeader from "./components/AuthenticatedAppHeader";
import UnAuthenticatedAppHeader from "./components/UnAuthenticatedAppHeader";
import useGetMe from "./models/auth/users/useGetMe";
import AlertBanner from "./components/AlertBanner";
import EncounterSearch from "./pages/EncounterSearch";

export default function AuthenticatedSwitch({ showAlert, setShowAlert }) {
  const { isFetched, data, error } = useGetMe();
  const username = data?.username;
  const avatar = data?.imageURL || "/react/images/Avatar.png";

  return (
    <div className="d-flex flex-column min-vh-100">
      <div
        id="header"
        className="position-fixed top-0 mx-auto w-100"
        style={{
          zIndex: "100",
          height: "60px",
          maxWidth: "1440px",
        }}
      >
        {showAlert && <AlertBanner setShowAlert={setShowAlert} />}
        <AuthenticatedAppHeader
          username={username}
          avatar={avatar}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      </div>

      <div
        id="main-content"
        className="flex-grow-1 d-flex justify-content-center mt-4 pt-5"
        style={{
          boxSizing: "border-box",
          maxWidth: "1440px",
          overflow: "hidden",
        }}
      >
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/encounter-search" element={<EncounterSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
