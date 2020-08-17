import React, { useState } from "react";
import Axios from "axios";
import { Redirect, Link, withRouter } from "react-router-dom";
import { ProfileInfo } from "./profileInfo";
import { ProfilePosts } from "./profilePosts";

class profile extends React.Component {
  state = { profile: null };
  componentDidMount() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/profile/${this.props.match.params.username}`,
      headers: {
        authorization: localStorage.token,
      },
    })
      .then((res) => {
        this.setState({ profile: res.data }, () => {
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
    const { profile } = this.state;

    return (
      <div>
        {profile && (
          <ProfileInfo
            username={profile.username}
            email={profile.email}
            bio={profile.bio}
            photoCount={profile.posts.length}
            followers={0}
            following={0}
          />
        )}
        <hr style={{ borderWidth: 2, backgroundColor: "#e3e3e3" }} />
        <section
          id="postsGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "1em",
          }}
        >
          {console.log(profile.posts) ||
            (profile &&
              profile.posts.map((post, i) => (
                <ProfilePosts
                  key={i}
                  filePath={post.filePath}
                  email={profile.email}
                  username={profile.username}
                  caption={post.caption}
                  created_at={post.created_at}
                />
              )))}

          {/* <pre
            style={{ textAlign: "left", padding: 32, backgroundColor: "white" }}
          >
            <code>{JSON.stringify(this.state, false, 2)}</code>
          </pre> */}
        </section>
      </div>
    );
  }
}

export default withRouter(profile);
