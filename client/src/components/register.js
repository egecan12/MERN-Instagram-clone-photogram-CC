import React, { useState } from "react";
import Axios from "axios";

function Register() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = () => {
    Axios({
      method: "POST",
      data: {
        email: registerUsername,
        password: registerPassword,
        username: registerUsername,
      },
      withCredentials: true,
      url: "http://localhost:5000/json/register",
    }).then((res) => console.log(res));
  };

  return (
    // <div className="row mt-5">
    //   <div className="col-md-6 m-auto">
    <div className="card card-body">
      <h1 className="text-center mb-3 text-secondary">Quick Register</h1>
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
          onChange={(e) => setRegisterUsername(e.target.value)}
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
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
      </div>

      <button
        onClick={register}
        type="submit"
        className="btn btn-success btn-block"
        data-dismiss="modal"
        aria-label="Close"
      >
        <a></a>
        Register
      </button>

      <p className="lead mt-4 text-secondary">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
    //   </div>
    // </div>
  );
}
export default Register;
