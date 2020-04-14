import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Switch } from "react-router-dom";
import AuthProvider from "./lib/Auth-provider";
import Signup from "./urls/Signup";
import Login from "./urls/Login";
import User from "./urls/User";
import MainList  from './components/MainList';
import NonPrivRoute from "./components/NonPrivRoute";
import PrivateRoute from "./components/PrivateRoute";
import WishList from "./components/WishList";
import Cart from './components/Cart'
import Home from './urls/Home'
import {Route} from 'react-router-dom'

import Product from "./components/Product";



class App extends Component {
  render() {
    return (
      <AuthProvider>  
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <NonPrivRoute exact path='/signup' component={Signup} />
            <Route exact path='/products' component={MainList} />
            <NonPrivRoute exact path='/login' component={Login} />
            <PrivateRoute  path='/user' component={User} />
            <PrivateRoute exact path='/wishlist' component={WishList} />
            <PrivateRoute exact path='/cart' component={Cart} />
            <Route exact path='/products/:id' component={Product} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;