import React, { useEffect, useState } from "react";
import { needAuth } from "../lib/Auth-provider";
import axios from "axios";
import ApiService from "../lib/service.js";

const WishList = (props) => {
  const [wishlistHearts, setWishlistHearts] = useState([]);

  useEffect(() => {
    console.log(props.match.params);
    ApiService.get_wishlist(props).then((responseFromAPI) => {
      setWishlistHearts(responseFromAPI.data);
      console.log(responseFromAPI.data);
    });
  }, []);
  console.log(wishlistHearts);

  return <div></div>;
};

export default needAuth(WishList);
