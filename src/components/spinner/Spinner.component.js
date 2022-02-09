import React from "react";
import "./spinner.styles.scss";

export default function Spinner() {
  return (
    <div className="Spinner">
      <figure className="spinner-container">
        <img className="spinner-logo" src="https://i.ibb.co/m0wRdZ1/1-K4-A-Passwords-128.png" alt="spinner"/>
        <div className="loading-spinner"></div>
      </figure>
    </div>
  );
}
