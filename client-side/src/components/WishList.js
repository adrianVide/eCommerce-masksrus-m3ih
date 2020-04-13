import React, { useEffect, useState } from "react";
import { needAuth } from "../lib/Auth-provider";
import axios from "axios";

const WishList = (props) => {

  const [wishlistHearts, setWishlistHearts] = useState([]);

  useEffect(() => {
      console.log(props.match.params);
    axios
      .get(`http://localhost:4000/user/wishlistid/${props.user._id}`)
      .then((responseFromAPI) => {
        setWishlistHearts(responseFromAPI.data);
        console.log(responseFromAPI.data);
        console.log(wishlistHearts);
      });
  }, []);

  return <div></div>;
};

export default needAuth(WishList);
