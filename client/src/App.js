import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Certificado from "./Pages/Certificado";
import { ContextProvider } from "./Context/UserContext";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/certificado" element={<Certificado />} />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
