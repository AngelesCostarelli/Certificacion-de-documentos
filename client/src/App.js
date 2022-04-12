import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Files from "./components/Files";
import LandingPage from "./components/LandingPage";
import { ContextProvider } from "./components/UserContext";
import Certificado from "./components/Certificado";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Files />} />
          <Route exact path="/certificado" element={<Certificado />} />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
