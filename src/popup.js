import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Login from "./components/login/Login.component";
import Home from "./components/home/Home.component";
import myApi from "./api/Apis";
function Popup() {
  // const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const loggedInUser = {};

  const ME_END_POINT = "users/me";
  const GET_METHOD = "get";

  useEffect(() => {
    chrome.storage.sync.get("loggedInUser", (data) => {
      try {
        Object.assign(loggedInUser, data.loggedInUser);

        const ME_END_POINT_CONFIG = {
          method: GET_METHOD,
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        };
        
        myApi(ME_END_POINT, ME_END_POINT_CONFIG).then(() => {
          setIsAuth(true);
          // navigate('/'); // For when logging-in change the url endpoint
        });
      } catch (err) {
        setIsAuth(false);
        console.log(err.message);
      }
    });
  }, [loggedInUser]);

  return (
    <>
      {isAuth ? <Home /> :<Login />}
    </>
  );
}

render(<Popup />, document.getElementById("react-target"));
