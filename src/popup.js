import React from 'react';
import { render } from "react-dom";
import AccountsList from "./components/AccountsList.component";


function Popup() {
  return (
    <div>
      <AccountsList />
    </div>
  );
}

render(<Popup />, document.getElementById("react-target"));