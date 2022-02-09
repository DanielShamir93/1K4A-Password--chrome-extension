import React from 'react';
import "./followMe.styles.scss";

export default function FollowMe({ openMySite }) {

  return (
    <div className="Follow-me">
        <div className="follow-me-icons">
          <figure className="linkedin-icon" onClick={() => openMySite("https://www.linkedin.com/in/daniel-shamir-3a22ba168/")}></figure>
          <figure className="github-icon" onClick={() => openMySite("https://github.com/DanielShamir93")}></figure>
        </div>
      </div>
  );
}