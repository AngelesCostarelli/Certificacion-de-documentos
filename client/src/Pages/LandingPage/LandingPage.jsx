import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import LoginButton from "./LogInButton";
import LogOutButton from "./LogOutButton";
import "../LandingPage/LandingPage.css";
export default function LandingPage() {
  const { isAuthenticated } = useAuth0();
  return (
    <section className="landing">
      {isAuthenticated ? (
        <div className="">
          <Profile />

          <LogOutButton />
          <br />
          <br />
          <Link to={"/home"}>
            <button className="boton">Go</button>
          </Link>
        </div>
      ) : (
        <div className="containerLand">
          <div>
            <div className="mje">BIENVENIDOS A DOCU-EXTRIMIAN</div>
            <div>Logueate con tu usuario y contraseña para comenzar</div>
          </div>
          <div className="logBtn">
            <LoginButton />
          </div>
        </div>
      )}
    </section>
  );
}
