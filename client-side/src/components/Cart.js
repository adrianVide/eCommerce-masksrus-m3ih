import React, { useEffect, useState } from "react";
import { needAuth } from "../lib/Auth-provider";
import ApiService from "../lib/service.js";

const Cart = (props) => {
  const [cartList, setCarList] = useState([]);

  useEffect(() => {

    //console.log(props)
    ApiService.get_cartlist(props).then((responseFromAPI) => {
      // console.log(responseFromAPI)
      setCarList(responseFromAPI.data);
      //console.log(responseFromAPI.data);
    });
  }, []);
  //console.log(cartList)

  return <div>
    <h2>Your cart</h2>

    {cartList.map(productInCart => {
      // console.log(productInCart)
      return (
        <div key={productInCart._id} className="card border-info mb-1 shadow">
          <h3>Shopping Cart</h3>
          <div className="d-flex card-body text-info">
            <h5 className="text-left">{productInCart.productId.name}</h5>
            <span className="align-self-center">
              <img className="list-img" src={productInCart.productId.photo} alt="" />
              {productInCart.productId.originalPrice} €
                  </span>
            <div>
              <div className="card-header">
              </div>
              <h5 className="card-title">{productInCart.name}</h5>
              <p className="card-text">{productInCart.description}</p>
              <p>x:{productInCart.quantity}</p>
            </div>
            <span>{productInCart.productId.originalPrice*productInCart.quantity}</span>
          </div>

          
        </div>
      )
    }
    )}
          <span>Total Amount : {cartList.length ? cartList.reduce((acc, currentv)  =>  {console.log(acc); console.log(currentv); return (Number(acc.productId.originalPrice*acc.quantity) + Number(currentv.productId.originalPrice*currentv.quantity))}).toFixed(2) : 'Loading'}</span>


  </div>;
};

export default needAuth(Cart);
