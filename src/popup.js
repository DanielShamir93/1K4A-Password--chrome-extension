import React, { Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Spinner from "./components/spinner/Spinner.component";
const App = React.lazy(() => import("./components/app/app.component"));

function Popup() {
  return (
    <BrowserRouter>
      <Suspense fallback={"waiting"}>
        <App />
      </Suspense>
    </BrowserRouter>
  );
}

render(<Popup />, document.getElementById("react-target"));

