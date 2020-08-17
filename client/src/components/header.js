import React, { useState } from "react";
import Axios from "axios";
import { Redirect, Link, withRouter } from "react-router-dom";
import Gravatar from "react-gravatar";
import SearchBar from "./searchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

require("dotenv").config();
const notify = () => toast.error("Logged out!");
const notifyUploadError = (message = "Error accured please try again later") =>
  toast.error(message);
const notifySuccess = (message = "") => toast.success(message);

class header extends React.Component {
  state = {
    settings: null,
    loggedIn: true,
    extension: null,
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
        this.setState({ settings: res.data });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          this.setState({ loggedIn: false });
          console.log(error.response);
        }
      });
  }
  logOut = () => {
    localStorage.clear();
    this.setState({ loggedIn: false });
    notify();
  };
  render() {
    const { settings, loggedIn } = this.state;

    return (
      <div>
        {" "}
        <ToastContainer autoClose={2000} position="top-left" zIndex={99999} />
        <div id="header" className="d-flex justify-content-between">
          <h5 className="d-flex mt-2 ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="15"
              height="15"
              className="mr-1"
            >
              <path
                fillRule="evenodd"
                d="M4.456.734a1.75 1.75 0 012.826.504l.613 1.327a3.081 3.081 0 002.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 11-1.061 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.081 3.081 0 00-1.707-2.084l-1.327-.613a1.75 1.75 0 01-.504-2.826L4.456.734zM5.92 1.866a.25.25 0 00-.404-.072L1.794 5.516a.25.25 0 00.072.404l1.328.613A4.582 4.582 0 015.73 9.63l.584 2.454a.25.25 0 00.42.12l5.47-5.47a.25.25 0 00-.12-.42L9.63 5.73a4.581 4.581 0 01-3.098-2.537L5.92 1.866z"
              ></path>
            </svg>{" "}
            <p className="pt-2"> Photogram</p>
          </h5>

          <SearchBar />

          {settings && (
            <div id="HeaderButtons" className="d-flex mr-2 mt-2 flex-row">
              {this.state.loggedIn ? (
                <React.Fragment>
                  <button
                    type="submit"
                    onClick={this.logOut}
                    className="btn btn-info "
                    style={{ height: 40 }}
                  >
                    Logout
                  </button>
                  {/* <Link to="/postImage"> */}
                  <button
                    type="submit"
                    onClick={() => {
                      this.setState({ formVisible: true });
                    }}
                    className="btn btn-info "
                    style={{ height: 40 }}
                  >
                    Post a Photo
                  </button>{" "}
                  {/* </Link> */}
                  <Link to="/setting">
                    <button className="btn btn-warning ">
                      <img src={require("./img/settings.svg")} />
                    </button>
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {" "}
                  <Link to="/login">
                    <button
                      type="submit"
                      //   onClick={(window.location.href = "/home")}
                      className="btn btn-info"
                      style={{ height: 40 }}
                    >
                      Log-in
                    </button>{" "}
                  </Link>
                </React.Fragment>
              )}
              {this.state.formVisible && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 30,
                    background: "rgba(0, 0 , 0, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    this.setState({ formVisible: false });
                  }}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // we did it in order to stop onclick event for rest of the code
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 32,
                      background: "white",
                    }}
                  >
                    <input
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        const type = e.currentTarget.files[0].type;
                        const name = e.currentTarget.files[0].name.split(".");
                        const extension = name[name.length - 1];

                        const reader = new FileReader();
                        reader.readAsDataURL(e.currentTarget.files[0]);
                        reader.onload = () =>
                          this.setState({
                            image: reader.result,
                            type,
                            extension,
                          });
                      }}
                    />
                    <textarea
                      placeholder="write something about your photo !"
                      onChange={(e) => {
                        this.setState({ caption: e.currentTarget.value });
                      }}
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        Axios({
                          method: "POST",
                          data: this.state,

                          headers: {
                            authorization: localStorage.token,
                          },
                          withCredentials: true,
                          url: "http://localhost:5000/postImage",
                        })
                          .then((res) => {
                            if (res.data.error) {
                              notifyUploadError(res.data.message);
                            }
                            if (res.data.error == false) {
                              console.log(res);
                              notifySuccess(res.data.message);
                            }
                          })
                          .catch((error) => {
                            notifyUploadError();
                            console.log(error);
                          });
                      }}
                    >
                      submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <hr style={{ borderWidth: 2, backgroundColor: "#e3e3e3" }} />
      </div>
    );
  }
}
export default withRouter(header);
