import React, { useState } from "react";
import Gravatar from "react-gravatar";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

require("dotenv").config();

// this is a dump functional component in order to import that we gotta use curly bracets
export const ProfilePosts = (props) => (
  <div className="card" width="100%" height="75%">
    <div className="card-header">
      <Gravatar className="user-image" email={props.email} />
      <p className="user-name text-secondary">{props.username}</p>
      <p className="time">{timeAgo.format(new Date(props.created_at))}</p>
    </div>
    <div className="card-image">
      <img
        src={process.env.PUBLIC_URL + props.filePath}
        width="300px"
        height="300px"
      />
    </div>
    <div className="card-content">
      <p className="d-flex text-secondary">13 likes</p>
      <hr style={{ borderWidth: 2, backgroundColor: "#e3e3e3" }} />

      <p className="text-secondary">{props.caption}</p>
      <p>
        <a href="#" className="hashtag">
          #sunset
        </a>
        <a href="#" className="hashtag">
          #nofilterneeded
        </a>
        <a href="#" className="hashtag">
          #yaNoMasHashtags
        </a>
      </p>
    </div>

    <div className="card-actions">
      <a href="#" className="action-icons" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          fillRule="evenodd"
          d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"
        ></path>
      </svg>

      <input className="comments-input" type="text" placeholder="comment..." />
      <a href="#" className="action-icons">
        <i className="fa fa-ellipsis-h"></i>
      </a>
    </div>
    {/*     
    <div className="d-flex card justify-content-center align-items-center">
      <img
        style={{
          display: "flex",
          alignItems: "center",
          width: "200px",
          height: "200px",
        }}
        src={process.env.PUBLIC_URL + props.filePath}
      />
      <div className="card-body">
        <h5 className="card-title text-dark">{props.caption}</h5>
      </div>
    </div> */}
  </div>
);
