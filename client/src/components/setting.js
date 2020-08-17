import React, { useState } from "react";
import Axios from "axios";
import Gravatar from "react-gravatar";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

class Setting extends React.Component {
  state = { settings: null };
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
        console.log(this);
        this.setState({ settings: res.data }, () => {
          console.log("state is set");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  save = () => {
    Axios({
      method: "POST",
      data: {
        username: this.state.settings.username,
        email: this.state.settings.email,
        birthday: this.state.settings.birthday,
        country: this.state.settings.country,
        publicProfile: this.state.settings.publicProfile,
        pushNotifications: this.state.settings.pushNotifications,
        bio: this.state.settings.bio,

        // settings: {
        //   publicProfile: this.state.settings.publicProfile,
        //   pushNotifications: this.state.settings.pushNotifications,
        // },
      },
      headers: {
        authorization: localStorage.token,
      },
      withCredentials: true,
      url: "http://localhost:5000/saveSetting",
    }).then((res) => console.log(res));
  };
  logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    const { settings } = this.state; //statedeki settingi rendera aliyoruz

    return (
      settings && ( //settings define ise anlamini veriyor
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <div
                className="d-flex"
                id="anaDiv"
                style={{
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Gravatar
                  email={settings.email}
                  style={{ border: "1px solid black", borderRadius: "50%" }}
                  size={150}
                />
                <p className="text-secondary"> Push Notifications: </p>
                <BootstrapSwitchButton
                  width={100}
                  onstyle="outline-success"
                  offstyle="outline-danger"
                  onChange={() => {
                    this.setState({
                      settings: {
                        ...settings, // setState i update etmek icin bunu cagirmak gerekiyor
                        pushNotifications: !settings.pushNotifications,
                      },
                    });
                  }}
                  checked={settings.pushNotifications}
                />
                {/* <input
                  type="checkBox"
                  onChange={() => {
                    this.setState({
                      settings: {
                        ...settings, // setState i update etmek icin bunu cagirmak gerekiyor
                        pushNotifications: !settings.pushNotifications,
                      },
                    });
                  }}
                  checked={settings.pushNotifications}
                /> */}
                <br />
                <p className="text-secondary">Public Profile:</p>
                <BootstrapSwitchButton
                  width={100}
                  onstyle="outline-success"
                  offstyle="outline-danger"
                  onChange={() => {
                    this.setState({
                      settings: {
                        ...settings, // setState i update etmek icin bunu cagirmak gerekiyor
                        publicProfile: !settings.publicProfile,
                      },
                    });
                  }}
                  checked={settings.publicProfile}
                />
                {/* <input
                  type="checkBox"
                  onChange={() => {
                    this.setState({
                      settings: {
                        ...settings, // we have to call setting to update it properly
                        publicProfile: !settings.publicProfile,
                      },
                    });
                  }}
                  checked={settings.publicProfile}
                /> */}
                <br />
                <p className="text-secondary">*Get an Unique Username</p>
                <input
                  className="form-control"
                  type="text"
                  maxLength={20}
                  onChange={(event) => {
                    this.setState({
                      settings: {
                        ...settings, // we have to call setting to update it properly
                        username: event.target.value,
                      },
                    });
                  }}
                  value={settings.username}
                />
                <br />
                <p className="text-secondary">Bio</p>
                <input
                  className="form-control"
                  type="text"
                  maxLength={60}
                  onChange={(event) => {
                    this.setState({
                      settings: {
                        ...settings, // we have to call setting to update it properly
                        bio: event.target.value,
                      },
                    });
                  }}
                  value={settings.bio}
                />
                <br />
                <label htmlFor="birthday" className="text-secondary">
                  What is your Birthdate:
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="birthday"
                  name="birthday"
                  onChange={(event) => {
                    this.setState({
                      settings: {
                        ...settings, // we have to call setting to update it properly
                        birthday: event.target.value,
                      },
                    });
                  }}
                  value={settings.birthday}
                />
                <br />
                <label htmlFor="text" className="text-secondary">
                  Where are you from:
                </label>{" "}
                <select
                  className="form-control"
                  name="country"
                  id="cars"
                  onChange={(event) => {
                    this.setState({
                      settings: {
                        ...settings, // we have to call setting to update it properly
                        country: event.target.value,
                      },
                    });
                  }}
                  value={settings.country}
                >
                  <option value="england">England</option>
                  <option value="canada">Canada</option>
                  <option value="u.s.a">U.S.A</option>
                  <option value="turkey">Turkey</option>
                  <option value="other">Other</option>
                </select>
                <br />
                <form
                  action="mailto:someone@example.com"
                  method="post"
                  encType="text/plain"
                >
                  <p className="text-secondary">
                    To change the email address, send us an email
                  </p>
                  <button type="submit" className="btn btn-warning">
                    Send a request mail
                  </button>
                </form>
                {/* This is email update logic 
                <input
                  className="form-control"
                  type="email"
                  onChange={(event) => {
                    this.setState({
                      settings: {
                        ...settings, // we have to call setting to update it properly
                        email: event.target.value,
                      },
                    });
                  }}
                  value={settings.email}
                /> */}
                <br />
                <div className="d-flex flex-row-reverse">
                  <a href="/userProfilePage">
                    <button
                      onClick={this.save}
                      type="submit"
                      className="btn btn-success"
                    >
                      Save Settings & Continue
                    </button>
                  </a>
                  <a href="/userProfilePage">
                    <button type="submit" className="btn btn-danger">
                      Cancel Changes
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default Setting;
