import React, { useEffect, useState } from "react";
import { needAuth } from "../lib/Auth-provider";
import ApiService from "../lib/service.js";
import {Link} from 'react-router-dom'

const Cart = (props) => {
  const [cartList, setCartList] = useState([]);

  
  useEffect(() => {
    
    //console.log(props)
    ApiService.get_cartlist(props).then((responseFromAPI) => {
      // console.log(responseFromAPI)
      setCartList(responseFromAPI.data);
      //console.log(responseFromAPI.data);
    });
  }, []);
  

    const delete_from_cart = (id)=> {
        ApiService.delete_from_cart(id).then((responseFromAPI) => {
          console.log(responseFromAPI)
        
        })
    }
  

  return <div>

        <div>
          <nav class="navbar navbar-expand-md navbar-dark bg-dark ">
            <div class="container">
              <a class="navbar-brand" href="index.html">Shopping list</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
                <ul class="navbar-nav m-auto">
                  <li class="nav-item m-auto">
                    <a class="nav-link" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="category">Categories</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/products">Product</a>
                  </li>
                  <li class="nav-item active">
                    <a class="nav-link" href="/user/cart">Cart <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/contact">Contact</a>
                  </li>
                </ul>

                <form class="form-inline my-2 my-lg-0">
                  <div class="input-group input-group-sm">
                    <div class="input-group-append">
                     
                    </div>
                  </div>
                  <a class="btn btn-success btn-sm ml-3" href="/cart">
                    <i class="fa fa-shopping-cart"></i> Cart
                    <span class="badge badge-light">{cartList.length ? cartList.reduce((acc, currentv) => Number(acc.quantity + currentv.quantity)): null}</span>
                  </a>
                </form>
              </div>
            </div>
          </nav>

          <section class="jumbotron text-center">
            <div class="container">
              <h1 class="jumbotron-heading">Your Shopping Cart</h1>
            </div>
          </section>
        
          <div class="container mb-4">
            <div class="row">
              <div class="col-12">
                <div class="table-responsive">
              
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col"> </th>
                        <th scope="col">Product</th>
                        <th scope="col">Available</th>
                        <th scope="col" class="text-center">Quantity</th>
                        <th scope="col" class="text-right">Price</th>
                        <th> </th>
                      </tr>
                    </thead>
     {cartList.map(productInCart => {
      return (
                    <tbody >
                      <tr>
                        <td><img style={{height:'40px'}} src = {productInCart.productId.photo} alt=''/> </td>
                        <td>{productInCart.productId.name}</td>
                        <td>Stock:{productInCart.stock}</td>
                        <td><input class="form-control" type="number" value={`${productInCart.quantity}`} /></td>
                        <td class="text-right">{productInCart.productId.originalPrice} €</td>
                        <td class="text-right"><button onClick={() => delete_from_cart(productInCart.productId)} class="btn btn-sm btn-danger" ><i class="fa fa-trash"></i> </button> </td>
                      </tr>
                    </tbody>
              
        )}
    )}
                      <tr>
                        <td> Subtotal:</td>
                        <td class="text-right"> {cartList.length > 1  ? cartList.reduce((acc, currentv) => { console.log(acc); console.log(currentv); return (Number(acc.productId.originalPrice * acc.quantity) + Number(currentv.productId.originalPrice * currentv.quantity)) }).toFixed(2) : 'Loading'}€</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Shipping</td>
                        <td class="text-right">6,90 €</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><strong>Total: </strong></td>
                        <td class="text-right"><strong> {cartList.length ? cartList.reduce((acc, currentv) => { console.log(acc); console.log(currentv); return (Number(acc.productId.originalPrice * acc.quantity) + Number(currentv.productId.originalPrice * currentv.quantity)) }).toFixed(2) : 'Loading'}€</strong></td>
                      </tr>
                  </table>
              
              <div class="col mb-2">
                <div class="row">
                  <div class="col-sm-12  col-md-6">
                   <Link to='/products' button class="btn btn-block btn-light" >Continue Shopping/</Link>
                  </div>
                  <div class="col-sm-12 col-md-6 text-right">
                    <button class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <footer class="text-light">
        
            <div class="container">
              <div class="row">
                <div class="col-md-3 col-lg-4 col-xl-3">
                  <h5>About</h5>
                  <hr class="bg-dark mb-2 mt-0 d-inline-block mx-auto w-25" />
                  <p style={{color:'black'}} class="mb-0">
                    Here you will find the best customer service Ever. Trust us and you will no regret it.
                </p>
                </div>
                
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto">
                  <h5>Others links</h5>
                  <hr class="bg-dark mb-2 mt-0 d-inline-block mx-auto w-25" />
                  <ul style={{color:'black'}} class="list-unstyled">
                    <li>About us</li>
                    <li>FAQ</li>
                
                  </ul>
                </div>

                <div class="col-md-4 col-lg-3 col-xl-3">
                  <h5>Contact</h5>
                  <hr class="bg-dark mb-2 mt-0 d-inline-block mx-auto w-25" />
                  <ul  style={{color:'black'}} class="list-unstyled">
                    <li><i class="fa fa-home mr-2"></i> Mask 'R' us</li>
                    <li><i class="fa fa-envelope mr-2"></i> maskrus@gmail.com</li>
                    <li><i class="fa fa-phone mr-2"></i> + 93 230 02 21</li>
                    <li><i class="fa fa-print mr-2"></i> + 669 12 12 43</li>
                  </ul>
                </div>
                <div class="col-12 copyright mt-3">
                  <p class="float-left">
                    <a href="#">Back to top</a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
        </div>
        </div>
        </div>
};


export default needAuth(Cart);
