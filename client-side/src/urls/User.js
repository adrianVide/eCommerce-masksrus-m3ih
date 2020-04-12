import React, { Component } from "react";
import { needAuth } from "../lib/Auth-provider";

class Private extends Component {
  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        <button onClick={this.props.logout}>Log out</button>
      </div>
    );
  }
}

export default needAuth(Private);
