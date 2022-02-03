import React from 'react';
import { render } from "react-dom";
import Account from "./components/Account";

function Popup() {
  return (
    <div>
      <Account />
    </div>
  );
}

render(<Popup />, document.getElementById("react-target"));