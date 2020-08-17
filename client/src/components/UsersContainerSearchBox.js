import React, { Component } from "react";
import NameLabel from "./nameLabel";

class UserContainerSearchBox extends Component {
  render() {
    return (
      <div>
        <div dataspy="scroll" data-target="#navbar-example3" data-offset="0">
          {this.props.users.map((name, i) => (
            <NameLabel
              key={i}
              name={name.username}
              email={name.email}
              bio={name.bio}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default UserContainerSearchBox;
