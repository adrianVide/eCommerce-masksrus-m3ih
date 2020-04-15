import React, { useEffect, useState } from "react";
import { needAuth } from "../lib/Auth-provider";
import ApiService from "../lib/service.js";
import { Link } from "react-router-dom";

const WishList = (props) => {
  const [wishlistHearts, setWishlistHearts] = useState([]);

  useEffect(() => {
    ApiService.get_wishlist_pop(props).then((responseFromAPI) => {
      setWishlistHearts(responseFromAPI.data);
      console.log(responseFromAPI.data);
    });
  }, []);

  console.log(wishlistHearts);
  // console.log(data);

  return (
    // <div classNameName="my-5 my-auto w-100 d-inline-block">
    <div>
      <div class="card-group">
        {wishlistHearts
          ? wishlistHearts.map((mask) => {
              return (
                <Link to={`/products/${mask._id}`} className="card-text-link">
                  <div class="card">
                    <img src={mask.photo} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">{mask.name}</h5>
                      <p class="card-text">{mask.description}</p>
                      <p class="card-text">
                        <small class="text-muted">{mask.originalPrice}</small>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          : "No Items on your wishlist"}
      </div>
    </div>
  );
};

export default needAuth(WishList);

{
  /* <div className="card bg-dark text-white">
                <img src={mask.photo} className="card-img" alt="..." />
                <div className="card-img-overlay">
                  <h5 className="card-title">{mask.name}</h5>
                  <p className="card-text">{mask.description}</p>
                  <p className="card-text">{mask.originalPrice}</p>
                </div>
              </div> */
}
