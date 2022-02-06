import React, { useState } from "react";
import myApi from "../../api/Apis";
import Box from "@material-ui/core/Box";
import BasicButton from "../basicButton/BasicButton.component";
import PasswordInput from "../passwordInput/PasswordInput.components";
import TextFieldInput from "../textFieldInput/TextFieldInput.component";
import validator from "validator";
import "./login.styles.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const LOGIN_END_POINT = "users/login";

  const login = () => {
    try {
      myApi.post(LOGIN_END_POINT, { email, password }).then((response) => {
        const { data: userData } = response;

        const loggedInUser = {
          uid: userData.user._id,
          email: userData.user.email,
          token: userData.token,
        };

        chrome.storage.sync.set({ loggedInUser }, function () {
          window.location.reload();
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const isValidInput = () => {
    if (email.length === 0) {
      setComment("Missing email")
      return false;
    } else if (password.length === 0) {
      setComment("Missing password")
      return false;
    } else if(!validator.isEmail(email)) {
      setComment("Invalid email")
      return false;
    }
    return true;
  }

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
                <PasswordInput label="password" setPassword={setPassword} />
              </div>
            </Box>
          </div>
          <BasicButton
            label="login"
            variant="contained"
            cb={() => {
              if (isValidInput()){
                login();
                setTimeout(() => {
                  setComment("Invalid email or password");
                }, 2000)
              }
            }}
          />
        </div>
        <div className="to-signup">
          {/* <a className="to-signup-text" type="_blank" href="https://one-key-for-all-paswords.herokuapp.com/">Signup</a> */}
        </div>
      </div>
    </div>
  );
}
