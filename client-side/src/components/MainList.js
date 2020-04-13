import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ApiService from "../lib/service.js";
import { needAuth } from "../lib/Auth-provider";

const MainList = (props) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [wishMasks, setWishMasks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/products`).then((apiResponse) => {
      setData(apiResponse.data);
    });
    console.log(props);
    if (props.user) {
      ApiService.get_wishlist(props).then((responseFromAPI) => {
        setWishMasks(responseFromAPI.data);
      });
    }
  }, []);

  const filteredData = data.filter((product) => product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

  filteredData.map((mask) => {
    if (wishMasks.includes(mask._id)) {
      mask.inWishList = true;
    } else {
      mask.inWishList = false;
    }
  });

  return (
    <div>
      <form>
        <input
          placeholder="Search for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name="query"
        />
      </form>

      {filteredData
        ? filteredData.map((mask) => {
            return (
              <div key={mask._id} className="card border-info mb-1 shadow">
                <div className="d-flex card-body text-info">
                  <span className="align-self-center">
                    <img className="list-img" src={mask.photo} alt="" />
                    {mask.originalPrice} €
                  </span>
                  <div>
                    <div className="card-header">
                      <h5 className="text-left">{mask.name}</h5>
                      <span className='float-right'>{mask.inWishList ? <i class="fa fa-heart" aria-hidden="true"></i> : <i class="fa fa-heart-o" aria-hidden="true"></i> }</span>
                    </div>
                    {/* <h5 className="card-title">{mask.name}</h5> */}
                    <p className="card-text">{mask.description}</p>
                  </div>
                </div>
              </div>
            );
          })
        : null}
      {/* <div>{filteredData ? filteredData.map(product => <p>{product.name}</p>) : null}</div> */}
    </div>
  );
};

export default needAuth(MainList);
