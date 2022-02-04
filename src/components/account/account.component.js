import React from 'react';
import { FcUnlock, FcLock, FcKey } from "react-icons/fc";
import { RiFileCopyLine } from "react-icons/ri";

export default function Account({ account }) {


  return (
    <div className="account" >
      <figure
        className="account-icon"
      ></figure>
      <div
        className="account-names"
      >
        <p className="account-name">{account.accountName}</p>
        <p className="account-subname">{account.accountSubname}</p>
      </div>
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
          />
        </div>
        <div className="output">
          <input
            className="output-input"
            type="text"
            placeholder="Output"
            readOnly
          />
          <RiFileCopyLine className="copy-button" />
        </div>
      </div>
    </div>
  );
}
