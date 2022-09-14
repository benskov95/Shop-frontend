import "./styles/Navbar.css";
import Header from "./base-components/Header";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = (status) => {
    setIsLoggedIn(status);
    history.push("/shop");
  };

  return (
    <div className="App" style={{height: "100vh"}}>
      <div style={{position: "fixed", zIndex: "-1", width: "100%", height: "100vh", top: "0", left: "0", right: "0", backgroundImage: "url(\"https://www.fg-a.com/wallpapers/2018-quatrefoil-background-white.jpg\")"}} />
      <Header
        isLoggedIn={isLoggedIn}
        loginMsg={isLoggedIn ? "Log out" : "Log in"}
        setLoginStatus={setLoginStatus}
      />
    </div>
  );
}
