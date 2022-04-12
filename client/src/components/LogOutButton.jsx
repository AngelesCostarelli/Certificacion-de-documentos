import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const LogOutButton = () => {
  const { logout } = useAuth0();
  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);
  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      class="btn btn-danger btn-sm w-10"
    >
      Logout
    </button>
  );
};
