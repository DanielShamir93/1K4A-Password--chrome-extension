import React from "react";
import "./spinner.styles.scss";
import logoImg from '../../assets/images/title_logo.png';

export default function Spinner() {
  return (
    <div className="Spinner">
      <figure className="spinner-container">
        <img className="spinner-logo" src={logoImg} alt="spinner"/>
        <div className="loading-spinner"></div>
      </figure>
    </div>
  );
}
