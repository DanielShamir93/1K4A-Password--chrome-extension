import React, { useState } from 'react';
import { FcUnlock, FcLock, FcKey } from "react-icons/fc";
import { RiFileCopyLine } from "react-icons/ri";
import { Password } from "keys-to-password";

export default function Account({ account }) {

  const [privateKey, setPrivateKey] = useState("");
  const [output, setOutput] = useState("");

  // Retrieve the password outcome
  const getPassword = () => {
    if (privateKey.length > 0) {
      // Key was assigned
      const password = new Password(privateKey, account.publicKey);
      const keyboardConfig = {
        avoidChars: account.passAvoidChars,
        isContainDigits: account.isPassHasDigit,
        isContainUpperCase: account.isPassHasUppercase,
        isContainLowerCase: account.isPassHasLowercase,
        isContainSymbols: account.isPassHasSymbol,
        mustContainChars: account.keyboardMustContain,
      };
      password.setKeyboard(keyboardConfig);
      if (account.hasOwnProperty("passPattern")) {
        // Account password generated via pattern
        password.generateFromPattern(account.passPattern);
        setOutput(password.getPassword());
      } else {
        // Account password generated via regular way
        const generateConfig = {
          passLength: +account.passLength,
          passStartsWith: account.passStartsWith,
          passEndsWidth: account.passEndsWith,
        };
        password.generate(generateConfig);
        setOutput(password.getPassword());
      }
    } else {
      setOutput("Missing Private Key");
    }
  };

  return (
    <div className="account" >
      <figure
        className="account-icon"
      ></figure>
      <div className="account-more">
        <div className="private-key">
          <label htmlFor="private-key-input">
            <FcKey className="private-key-icon" />
          </label>
          <input
            className="private-key-input"
            id="private-key-input"
            type="password"
            placeholder="Private Key"
            onChange={(e) => {
              setPrivateKey(e.target.value);
            }}
            value={privateKey}
          />
        </div>
        {privateKey.length > 0 ? (
          <FcUnlock className="get-password-button" onClick={getPassword} />
        ) : (
          <FcLock className="get-password-button" />
        )}
        <div className="output">
          <input
            className="output-input"
            type="text"
            placeholder="Output"
            value={output}
            readOnly
          />
          <RiFileCopyLine className="copy-button" />
        </div>
      </div>
    </div>
  );
}
