import React, { Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Spinner from "./components/spinner/Spinner.component";
import "./styles/normalize.scss";
import "./styles/reset.scss";

const App = React.lazy(() => import("./components/app/app.component"));

function Popup() {

  return (
    <BrowserRouter>
      {/* <Suspense fallback={<Spinner />}>
        <App /> 
      </Suspense> */}
      <Spinner />
    </BrowserRouter>
  );
}

render(<Popup />, document.getElementById("react-target"));

