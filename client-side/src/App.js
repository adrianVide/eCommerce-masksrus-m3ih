import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import AuthProvider from "./lib/Auth-provider";
import Signup from "./urls/Signup";
import Login from "./urls/Login";
import User from "./urls/User";
import NonPrivRoute from "./components/NonPrivRoute";
import PrivateRoute from "./components/PrivateRoute";


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className='container'>
          <Switch>
            <NonPrivRoute exact path='/signup' component={Signup} />
            <NonPrivRoute exact path='/login' component={Login} />
            <PrivateRoute exact path='/user' component={User} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;