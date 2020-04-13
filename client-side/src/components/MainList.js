import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const MainList = () => {


  const [data, setData] = useState([]);
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:4000/products`)
      .then((apiResponse) => { setData(apiResponse.data) })
  }, [])


  const filteredData = data.filter(product => product.name.includes(query))

  return (
    <div>
      <form>
        <input
          placeholder="Search for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name='query'
        />
      </form>

      {filteredData ? (filteredData.map((mask) => {
        return (
          <div key={mask._id} className="card border-info mb-1 shadow">

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
      })) : null}
      {/* <div>{filteredData ? filteredData.map(product => <p>{product.name}</p>) : null}</div> */}
    </div>
  );
};

export default MainList