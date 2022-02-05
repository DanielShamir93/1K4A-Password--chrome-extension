import React, { useState, useEffect } from "react";
import Login from "../login/Login.component";
import AuthRoutes from "../authRoutes/AuthRoutes.component";
import myApi from "../../api/Apis";
import Spinner from "../spinner/Spinner.component";

export default function App() {
  const [isTimesUp, setIsTimesUp] = useState(false)
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
          });
        } catch (err) {
          setIsAuth(false);
          console.log(err.message);
        }
      });

    setTimeout(() => {
      setIsTimesUp(true)
    }, 1000)
    
  }, [loggedInUser]);

  return (
    <> {isTimesUp ? (isAuth ? <AuthRoutes /> : <Login />) : <Spinner />} </>
  );
}

