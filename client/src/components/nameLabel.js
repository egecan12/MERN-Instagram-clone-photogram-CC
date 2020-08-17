import React, { Component } from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import Gravatar from "react-gravatar";

class NameLabel extends Component {
  render() {
    const username = this.props.name;
    const email = this.props.email;
    return (
      <ul style={{ marginRight: "40px" }}>
        <li
          style={{
            listStyleType: "none",
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "8px",
            margin: "10px auto",
            border: "1px solid #222",
            background: "white",
            borderRadius: "4px",
          }}
        >
          <div>
            <a
              style={{
                marginLeft: "10px",
                textDecoration: "none",
                color: "grey",
              }}
              href={`/profile/${username}`}
            >
              <Gravatar
                email={this.props.email}
                style={{ border: "1px solid black", borderRadius: "50%" }}
                size={25}
                className="mr-2"
              />
              {this.props.name}
              <br />
              <hr />
              <b>
                {" "}
                <p className="text-dark" style={{ textAlign: "center" }}>
                  {this.props.bio}
                </p>{" "}
              </b>
            </a>
          </div>
        </li>
      </ul>
    );
  }
}

export default withRouter(NameLabel);
