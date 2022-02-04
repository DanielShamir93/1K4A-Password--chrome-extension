import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../login/Login.component";
import AuthRoutes from "../authRoutes/AuthRoutes.component";
import myApi from "../../api/Apis";

export default function App() {
  const navigate = useNavigate();
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
          navigate('/popup.html'); // For when logging-in change the url endpoint
        });
      } catch (err) {
        setIsAuth(false);
        console.log(err.message);
      }
    });
  }, [loggedInUser]);

  return (
    <> {isAuth ? <AuthRoutes /> : <Login />} </>
  );
}

