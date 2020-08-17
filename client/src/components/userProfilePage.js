import React, { useState } from "react";
import Axios from "axios";
import { Redirect, Link, withRouter } from "react-router-dom";
import Header from "./header";
import { ProfileInfo } from "./profileInfo";
import { ProfilePosts } from "./profilePosts";
import Gravatar from "react-gravatar";

require("dotenv").config();

class userProfilePage extends React.Component {
  state = {
    settings: null,
    loggedIn: true,
    formVisible: false,
    image: null,
    caption: null,
    posts: [],
  };
  componentDidMount() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/setting",
      headers: {
        authorization: localStorage.token,
      },
    })
      .then((res) => {
        this.setState({ settings: res.data }, () => {});
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          this.setState({ loggedIn: false });
          console.log(error.response);
        }
      });
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/getPosts",
      headers: {
        authorization: localStorage.token,
      },
    })
      .then((res) => {
        console.log(this);
        this.setState({ posts: res.data }, () => {
          console.log("state is set");
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          this.setState({ loggedIn: false });
          console.log(error.response);
        }
      });
  }

  render() {
    const { settings } = this.state; //statedeki settingi rendera aliyoruz
    console.log(this.state);

    const array = this.state.posts;

    console.log(array);
    return (
      settings && (
        <div>
          <ProfileInfo
            username={settings.username}
            email={settings.email}
            bio={settings.bio}
            photoCount={this.state.posts.length}
            followers={0}
            following={0}
          />
          <hr style={{ borderWidth: 2, backgroundColor: "#e3e3e3" }} />
          {/* // bunuda props yap dump componente cevir ki public profile da kullanabilesin */}
          <section
            id="postsGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "1em",
            }}
          >
            {this.state.posts.map((post, i) => (
              <ProfilePosts
                key={i}
                filePath={post.filePath}
                caption={post.caption}
                email={settings.email}
                username={settings.username}
                created_at={post.created_at}
              />
            ))}
            {/* <div id="profileImages" style={{ width: "100%" }}>
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridGap: "1em",
              }}
            >
              {this.state.posts.map((post) => (
                <div key={post._id}>
                  <div className="d-flex card justify-content-center align-items-center">
                    <img
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "200px",
                        height: "200px",
                      }}
                      src={process.env.PUBLIC_URL + post.filePath2}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-dark">{post.caption}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div> */}
          </section>
        </div>
      ) //settings define ise anlamini veriyor
    );
  }
}
export default withRouter(userProfilePage);
