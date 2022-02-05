import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import myApi from "../../api/Apis";
import Box from "@material-ui/core/Box";
import BasicButton from "../basicButton/BasicButton.component";
import PasswordInput from "../passwordInput/PasswordInput.components";
import TextFieldInput from "../textFieldInput/TextFieldInput.component";
import "./login.styles.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  
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

          navigate('/popup.html'); // For when logging-in change the url endpoint
        });
      
    } catch (err) {
      setComment(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="Login">
      <div className="login-view">
        <p className="login-title">Login</p>
        <p className="login-comment">{comment}</p>
        <div className="login-box">
          <div className="login-box-inputs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: 150,
                alignItems: "center",
              }}
            >
              <div className="email">
                <TextFieldInput label="email" setEmail={setEmail} />
              </div>
              <div className="password">
                <PasswordInput label="password" setPassword={setPassword}/>
              </div>
            </Box>
          </div>
          <BasicButton label="login" variant="contained" cb={login} />
        </div>
        <div className="to-signup">
          {/* <a className="to-signup-text" type="_blank" href="https://one-key-for-all-paswords.herokuapp.com/">Signup</a> */}
        </div>
      </div>
    </div>
  );
}
