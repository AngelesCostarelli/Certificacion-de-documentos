import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  return (
    <nav className="navbar ">
      <div className="container">
        <Link to="/">
          <img
            src="https://www.extrimian.com/assets/img/extrimian_logo.svg"
            alt=""
            width="160"
            height="47"
          />
        </Link>
      </div>
    </nav>
  );
}
