import React, { Component } from "react";
import { needAuth } from "../lib/Auth-provider";
import {Link} from 'react-router-dom'

class User extends Component {
  render() {
  //  console.log(this.props)
    return (
      <div>
        <h1>Welcome {this.props.user.email}</h1>
        <button onClick={this.props.logout}>Log out</button>
        <Link to='/products'> Go products</Link>
      </div> 
    );
  }
}

export default needAuth(User);
