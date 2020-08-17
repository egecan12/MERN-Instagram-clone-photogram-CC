import React, { useState } from "react";
import Axios from "axios";
import { Redirect, Link, withRouter } from "react-router-dom";
import UserContainerSearchBox from "./UsersContainerSearchBox";

let searchTimer = null;
class SearchBar extends React.Component {
  state = {
    searchVisible: false,
    users: [],
  };

  componentDidMount() {}
  editSearchTerm = (e) => {
    if (e.target.value == "") {
      return;
    }
    e.persist();
    // this.setState({ searchTerm: e.target.value });
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      Axios({
        method: "POST",
        withCredentials: true,
        url: "http://localhost:5000/getUsers",
        data: {
          keyword: e.target.value,
        },
      })
        .then((res) => {
          this.setState({ users: res.data }, () => {
            console.log("users is set");
            console.log(this.state.users);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  };

  dynamicSearch = () => {
    const { users } = this.state;
    return this.state.users.filter((user) =>
      user.username.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };
  handleChange = () => {
    // UserContainerSearchBox.style.in;
  };
  render() {
    const { users } = this.state; //useri yukarida destructure etmem lazim ama yapamiyorum

    return (
      //   users &&
      //   users.map((user, i) => <UserList key={i} username={user.username} />)
      // <div>
      //   <input />

      //   {users &&
      //     users.map((user, i) => <UserList key={i} username={user.username} />)}
      // </div>
      <div className=" mt-2">
        <div>
          <input
            type="text"
            onChange={this.editSearchTerm}
            placeholder="Search for username !"
            className="form-control"
            onFocus={() => {
              this.setState({ searchVisible: true });
            }}
            //bunu acinca linke tiklayinca unvisible oluyor
            // onBlur={() => {
            //   this.setState({ searchVisible: false });
            // }}
          />
          <div
            style={{
              display:
                this.state.users.length > 0 && this.state.searchVisible
                  ? "flex"
                  : "none",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              id="scroll-div"
              style={{
                backgroundColor: "#CCCCCC",
                width: "500px",
                height: "300px",
                overflow: "scroll",
              }}
            >
              <UserContainerSearchBox
                style={{
                  display: "flex",
                }}
                users={this.state.users}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SearchBar);
