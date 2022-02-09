import React, { useState, useEffect } from "react";
import Login from "../login/Login.component";
import AuthRoutes from "../authRoutes/AuthRoutes.component";
import Spinner from "../spinner/Spinner.component";
import FollowMe from "../followMe/FollowMe.component";
import myApi from "../../api/Apis";
import "./app.styles.scss";

export default function App() {
  const [isTimesUp, setIsTimesUp] = useState(false);
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
      setIsTimesUp(true);
    }, 1500);
  }, []);

  const openMySite = (url) => {
    chrome.tabs.create({ url });
  }

  return (
    <div className="App">
      {isTimesUp && (
        <img
          className="logo"
          src="https://i.ibb.co/Tq5bppS/1-K4-A-Passwords-48.png"
        />
      )}
      {isTimesUp ? isAuth ? <AuthRoutes /> : <Login /> : <Spinner />}
      {isTimesUp && <div className="link-to-site" onClick={() => {openMySite("https://one-key-for-all-paswords.herokuapp.com/")}}>1K4A-Passwords.com</div>}
      {isTimesUp && <FollowMe className="follow-me" openMySite={openMySite}/>}
    </div>
  );
}
