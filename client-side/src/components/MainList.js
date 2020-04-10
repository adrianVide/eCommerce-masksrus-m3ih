import React, { useEffect, useState } from "react";
import axios from "axios";

export const MainList = () => {
  const [listOfMasks, setListOfMasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/products/").then((responseFromAPI) => {
      setListOfMasks(responseFromAPI.data);
      console.log(setListOfMasks);
    });
  }, []);

  // return (
  //   <div>
  //     {listOfMasks.map((mask) => {
  //       return <div key={mask._id}>{mask.name}</div>;
  //     })}
  //   </div>
  // );

  return (
    <div>
      <div className="row">
        <div className=" d-flex justify-content-around flex-wrap align-items-end p-5">
          {listOfMasks.map((mask) => {
            return (
              <div key={mask._id}>
                <div className="card cardBeer ">
                  <div className="card-body d-flex justify-content-center flex-wrap align-items-end">
                    <img className="beerImg" src={mask.image_url} alt="" />
                  </div>
                </div>
                <div className="card  mb-5 cardBeert">
                  <div className="card-body d-flex justify-content-center flex-wrap align-items-end">
                    <h3 className="text-center text-Beer">{mask.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// <div>{(!!listOfMasks) && listOfMasks.map(e => {
//     <div key={e._id}>
//     })}</div>;
