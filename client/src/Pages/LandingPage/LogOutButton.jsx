import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const LogOutButton = () => {
  const { logout } = useAuth0();
  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);
  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="boton"
    >
      Logout
    </button>
  );
};

export default LogOutButton;
