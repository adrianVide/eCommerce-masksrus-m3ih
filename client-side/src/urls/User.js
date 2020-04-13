import React, { Component } from "react";
import { needAuth } from "../lib/Auth-provider";

class User extends Component {
  render() {
  //  console.log(this.props)
    return (
      <div>
        <h1>Welcome {this.props.user.email}</h1>
        <button onClick={this.props.logout}>Log out</button>
      </div>
    );
  }
}

export default needAuth(User);
