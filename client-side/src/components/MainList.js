import React, { useEffect, useState } from "react";
import axios from "axios";

const MainList = () => {
  const [listOfMasks, setListOfMasks] = useState([]);
  const [wishlistHearts, setWishlistHearts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/products/").then((responseFromAPI) => {
      setListOfMasks(responseFromAPI.data);
      console.log(responseFromAPI.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/user/").then((responseFromAPI) => {
      setWishlistHearts(responseFromAPI.data);
      console.log(responseFromAPI.data);
    });
  }, []);


  return (
    <div>
      {listOfMasks.map((mask) => {
        return (
          <div className="card border-info mb-1 shadow">
            
            <div className="d-flex card-body text-info">
              <span className="align-self-center">
                <img className="list-img" src={mask.photo} alt="" />
                {mask.originalPrice} €
              </span>
              <div><div className="card-header">
              <h5>{mask.name}</h5>
            </div>
                {/* <h5 className="card-title">{mask.name}</h5> */}
                <p className="card-text">{mask.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainList