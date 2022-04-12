import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <button onClick={() => loginWithPopup()} class="btn btn-danger btn-sm w-10">
      Log In
    </button>
  );
};

export default LoginButton;
