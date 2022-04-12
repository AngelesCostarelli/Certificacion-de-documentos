import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "./LogInButton";
import { LogOutButton } from "./LogOutButton";
import Profile from "./Profile";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <div style={{ padding: "100px" }}>
          <div class="card text-center">
            <div class="card-header">DOCU EXTRIMIAN</div>
            <div class="card-body">
              <h5 class="card-title">BIENVENIDO!</h5>
              <p class="card-text">Press go to continue...</p>

              <Profile />
              <br />

              <LogOutButton />
              <br />
              <br />
              <Link to={"/home"}>
                <button className="btn btn-primary btn-sm w-10">Go</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "100px" }}>
          <div class="card text-center">
            <div class="card-header">DOCU EXTRIMIAN</div>
            <div class="card-body">
              <h5 class="card-title">
                BIENVENITOS A LA APPLICACION DE CERTIFICACION DE DOCUMENTOS
              </h5>
              <p class="card-text">Logueate con tu usurio para continuar</p>
              <LoginButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
