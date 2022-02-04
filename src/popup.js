import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/app.component";

function Popup() {
  
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

render(<Popup />, document.getElementById("react-target"));
