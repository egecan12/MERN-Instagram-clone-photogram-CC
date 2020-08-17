import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Register from "./register";
import PhotoExample from "./img/app.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = () => {
    // if (localStorage.token) {
    //   return this.props.history.push("/setting");
    // }

    Axios({
      method: "POST",
      data: {
        email: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/json/login",
    })
      .then((res) => {
        if (res.data.error) {
          return toast.error(res.data.message);
        }
        localStorage.token = res.data.token;
        window.location.pathname = "/setting";
      })
      .catch(() => {
        toast.error("an error occured");
      });
  };
  // logOut = () => {
  //   localStorage.clear();
  //   window.location.reload();
  // };
  // window.location.reload()
  return (
    <div className="d-flex">
      <ToastContainer autoClose={2000} position="top-left" zIndex={99999} />

      <img
        style={{
          display: "flex",
          alignItems: "center",
          width: "55%",
          height: "75%",
        }}
        src={PhotoExample}
      />
      <div className="row mt-1 pb-5 flex-column ">
        <div className="card card-body">
          <h1 className="text-center mb-3 text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-aperture"
            >
              <circle cx="22" cy="22" r="30"></circle>
              <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
              <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
              <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
              <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
              <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
              <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
            </svg>{" "}
            Photogram Login
          </h1>
          <div className="form-group">
            <label htmlFor="email" className="text-secondary">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-secondary">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          {/* <form action="/login" method="post"> */}
          <button
            onClick={login}
            type="submit"
            className="btn btn-info btn-block"
          >
            Login
          </button>
          {/* </form> */}
          {/* <button onClick={login} type="submit" className="btn btn-info btn-block">Login</button> */}
          <p className="lead mt-4 text-secondary"> No Account? </p>
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Register{" "}
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Free Register
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {" "}
                  <Register />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
