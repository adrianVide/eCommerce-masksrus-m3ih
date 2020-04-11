import React, { useEffect, useState } from "react";
import axios from "axios";

export const MainList = () => {
  const [listOfMasks, setListOfMasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/products/").then((responseFromAPI) => {
      setListOfMasks(responseFromAPI.data);
      console.log(responseFromAPI.data);
    });
  }, []);

  return (
    <div>
      {listOfMasks.map((mask) => {
        return (
          <div className="card border-info mb-3">
            <div className="card-header"><h5>{mask.name}</h5></div>
            <div className="d-flex card-body text-info">
              <span className='align-self-center'>
                <img className="list-img" src={mask.photo} alt="" />{mask.originalPrice} €
              </span>
              <div>
                {/* <h5 className="card-title">{mask.name}</h5> */}
                <p className="card-text">{mask.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    // <div>
    //   {listOfMasks.map((mask) => {
    //     return (
    //       <div key={mask.id} classNameName="media">
    //         <div classNameName="fav-box">
    //           <i classNameName="fa fa-heart-o" aria-hidden="true"></i>
    //         </div>
    //         <img
    //           classNameName="d-flex align-self-start"
    //           src={mask.photo}
    //           alt="Generic placeholder image"
    //         />
    //         <div classNameName="media-body pl-3">
    //           <div classNameName="price">
    //           {mask.name}
    //             <small>{mask.originalPrice}</small>
    //           </div>
    //           <div classNameName="stats">
    //             {/* <span>
    //               <i classNameName="fa fa-arrows-alt"></i>1678 Sq ft
    //             </span>
    //             <span>
    //               <i classNameName="fa fa-bath"></i>2 Beadrooms
    //             </span> */}
    //             <div>{mask.description}</div>
    //           </div>
    //           <div classNameName="address">4062 Walnut Hill Drive Cincinnati</div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

//   return (
//     <div>
//       <div classNameNameName="row">
//         <div classNameNameName=" d-flex justify-content-around flex-wrap align-items-end p-5">
//           {listOfMasks.map((mask) => {
//             return (
//               <div key={mask._id}>
//                 <div classNameNameName="card cardBeer ">
//                   <div classNameNameName="card-body d-flex justify-content-center flex-wrap align-items-end">
//                     <img classNameNameName="card-img-top" src={mask.photo} alt="" />
//                   </div>
//                 </div>
//                 <div classNameNameName="card  mb-5 cardBeert">
//                   <div classNameNameName="card-body d-flex justify-content-center flex-wrap align-items-end">
//                     <h3 classNameNameName="text-center text-Beer">{mask.name}</h3>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

//   return (
//     <div classNameName="row">
//       {listOfMasks.map((mask) => {
//         return (
//           <div classNameName="col-md-3 col-sm-6">
//             <div classNameName="product-grid6">
//               <div classNameName="product-image6">
//                 <a href="#">
//                   <img classNameName="pic-1" src={mask.photo} />
//                 </a>
//               </div>
//               <div classNameName="product-content">
//                 <h3 classNameName="title">
//                   <a href="#">{mask.name}</a>
//                 </h3>
//                 <div classNameName="price">
//                   {mask.price}
//                   <span>{mask.price}</span>
//                 </div>
//               </div>
//               <ul classNameName="social">
//                 <li>
//                   <a href="" data-tip="Quick View">
//                     <i classNameName="fa fa-search"></i>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="" data-tip="Add to Wishlist">
//                     <i classNameName="fa fa-shopping-bag"></i>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="" data-tip="Add to Cart">
//                     <i classNameName="fa fa-shopping-cart"></i>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
