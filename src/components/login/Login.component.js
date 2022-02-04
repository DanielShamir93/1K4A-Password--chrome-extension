import React, { useState } from "react";
import myApi from "../../api/Apis";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const LOGIN_END_POINT = "users/login";

  const login =  () => {
    try {
      myApi.post(LOGIN_END_POINT, { email, password })
        .then((response) => {
          const { data: userData } = response;

          const loggedInUser = {
            uid: userData.user._id,
            email: userData.user.email,
            token: userData.token
          }

          chrome.storage.sync.set({ loggedInUser }, function() {
            console.log(JSON.stringify(loggedInUser));
          });

        });
      
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="Login">
      <div className="login-view">
        <p className="login-title">Login</p>
        <p className="login-comment">{false && "comment"}</p>
        <div className="login-box">
          <div className="login-box-inputs">
            <input className="email-input" 
              placeholder="Email" 
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <input className="password-input" 
              placeholder="Password" 
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>
          <button onClick={login}>Submit</button>
        </div>
      </div>
    </div>
  );
}
