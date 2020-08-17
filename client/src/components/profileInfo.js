import React, { useState } from "react";
import Gravatar from "react-gravatar";
// this is a dump functional component in order to import that we gotta use curly bracets
export const ProfileInfo = (props) => (
  <div id="profileInfo" className="d-flex justify-content-around">
    <div className="d-flex ">
      <Gravatar
        email={props.email}
        style={{ border: "1px solid black", borderRadius: "50%" }}
        size={150}
      />

      <div id="profileTextInfo" className="p-4">
        <div className="d-flex ">
          <b>
            <p className="d-flex " style={{ fontSize: "1.5em" }}>
              {" "}
              {props.username}
            </p>
          </b>
          <button
            type="button"
            className=" d-flex btn btn-info btn-sm  ml-4"
            style={{ height: 20 }}
          >
            <span className=" d-flex  justify-content-center">follow</span>
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <div className="">
            <b>
              Photos <br /> {props.photoCount}
            </b>
          </div>
          <div className="col-sm">
            <b>
              Followers <br />
              {props.followers}
            </b>
          </div>
          <div className="col-sm">
            <b>
              Following
              <br /> {props.following}
            </b>
          </div>
        </div>
        <div>
          <p className="d-flex mt-4">{props.bio}</p>
        </div>
      </div>
    </div>
  </div>
);
