import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ApiService from "../lib/service.js";
import { needAuth } from "../lib/Auth-provider";
import Loader from "react-loader-spinner";

const Product = (props) => {
  let theHeart;
  const [isLoading, setIsLoading] = useState(true);
  const [theProduct, setTheProduct] = useState({});
  const [theWishlist, setTheWishlist] = useState([]);
  const [update, setUpdate] = useState(false);
  theWishlist.includes(theProduct._id) ? (theHeart = true) : (theHeart = false);
  console.log("Refresh");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${props.match.params.id}`)
      .then((apiResponse) => {
        setTheProduct(apiResponse.data);
      });
      if (props.user) {
        ApiService.get_wishlist(props).then((responseFromAPI) => {
          if (responseFromAPI !== theWishlist) {
            setTheWishlist(responseFromAPI.data);
            console.log(responseFromAPI.data);
          }
        });
      }
    // console.log(props.user.wishList);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (props.user) {
      ApiService.get_wishlist(props).then((responseFromAPI) => {
        if (responseFromAPI !== theWishlist) {
          setTheWishlist(responseFromAPI.data);
          console.log(responseFromAPI.data);
        }
      });
    }
  }, [update]);

  function heartChange() {
    theHeart
      ? ApiService.removeFromWishlist(props.match.params.id)
      : ApiService.addToWishlist(props.match.params.id);
    theHeart = !theHeart;
    console.log(theHeart);
    setUpdate(!update);
  }

  // theWishlist.includes(theProduct._id) ? (theHeart = true) : (theHeart = false);

  return (
    <div>
      {isLoading ? (
        <div>
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div className="container">
          <h1 className="my-4">{theProduct.name}</h1>
          <h2>by {theProduct.brand}</h2>

          <div className="row">
            <div className="col-md-8">
              <img className="img-fluid" src={theProduct.photo} alt="" />
            </div>

            <div className="col-md-4">
              {props.user ? (
                <span className="float-right turquoise-color">
                  {theHeart ? (
                    <button onClick={heartChange}>
                      test<i class="fa fa-heart" aria-hidden="true"></i>
                    </button>
                  ) : (
                    <button onClick={heartChange}>
                      test<i class="fa fa-heart-o" aria-hidden="true"></i>
                    </button>
                  )}
                </span>
              ) : (
                <span>You are not logged in, motherfucker</span>
              )}

              <h3 className="my-3">Product Description</h3>
              <p>{theProduct.description}</p>
              <h3 className="my-3">Product Details</h3>
              <ul>
                <li>Material: {theProduct.material}</li>
                <li>Size: {theProduct.size}</li>
                <li>Color: {theProduct.color}</li>
                <li>Stock: {theProduct.stock}</li>
                <li>Shipping Time: {theProduct.shippingTime}</li>
              </ul>
            </div>
          </div>

          <h3 className="my-4">Related Products</h3>

          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <a href="#">
                <img
                  className="img-fluid"
                  src="http://placehold.it/500x300"
                  alt=""
                />
              </a>
            </div>

            <div className="col-md-3 col-sm-6 mb-4">
              <a href="#">
                <img
                  className="img-fluid"
                  src="http://placehold.it/500x300"
                  alt=""
                />
              </a>
            </div>

            <div className="col-md-3 col-sm-6 mb-4">
              <a href="#">
                <img
                  className="img-fluid"
                  src="http://placehold.it/500x300"
                  alt=""
                />
              </a>
            </div>

            <div className="col-md-3 col-sm-6 mb-4">
              <a href="#">
                <img
                  className="img-fluid"
                  src="http://placehold.it/500x300"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default needAuth(Product);
