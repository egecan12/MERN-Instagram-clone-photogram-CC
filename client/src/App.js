import React, { useState } from "react";
import Axios from "axios";

import "./App.css";
// import Axios from "axios";
import Login from "./components/login";
import Register from "./components/register";
import UserProfilePage from "./components/userProfilePage";
import Setting from "./components/setting";
import Header from "./components/header";
import Profile from "./components/profile";
import SearchBar from "./components/searchBar";

// import Register from "./components/register";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";

//SELF COMMENTS//
// I must delete the console.log() functions in order to provide 100% security on Register, Login

class App extends React.Component {
  // const getUser = () => {
  //   Axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: "http://localhost:5000/user",
  //   }).then((res) => {
  //     setData(res.data);
  //     console.log(res.data);
  //   });
  // };

  componentDidMount() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/session",
      headers: {
        authorization: localStorage.token,
      },
    })
      .then((res) => {
        localStorage.user = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    if (!localStorage.token) {
      return this.props.history.push("/login");
    }
    if (localStorage.token === "undefined") {
      return this.props.history.push("/login");
    }
    // else {
    //   return this.props.history.push("/setting");
    // }
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <Header />

          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/userProfilePage" component={UserProfilePage} />
            <Route exact path="/profile/:username" component={Profile} />

            <Route exact path="/setting" component={Setting} />
          </Switch>
        </div>

        <footer
          style={{
            padding: "10px",
            backgroundColor: "#efefef",
            textAlign: "center",
          }}
        >
          A photo collection application developed by Egecan Kahyaoglu
        </footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
