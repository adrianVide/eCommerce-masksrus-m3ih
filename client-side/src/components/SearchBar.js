import React from 'react'
import axios from 'axios'

class SearchBar extends React.Component {
    state = {
      query: "",
      data: [],
      filteredData: []
    };
  
    handleInputChange = event => {
      const query = event.target.value;
  
      this.setState(prevState => {
        const filteredData = prevState.data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });
  
        return {
          query,
          filteredData
        };
      });
    };
  
    getData = () => {
      axios.get(`http://localhost:4000/products`)
        .then(response => response.data)
        .then(data => {
          const { query } = this.state;
          const filteredData = data.filter(element => {
              return element.name.toLowerCase().includes(query.toLowerCase());
            });
            console.log(filteredData)
            
          this.setState({
            data:filteredData
          });
        });
    };
  
    componentWillMount() {
      this.getData();
    }
  
    render() {
      return (
        <div className="searchForm">
          <form>
            <input
              placeholder="Search for..."
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
          <div>{this.state.filteredData.map(product => <p>{product.name}</p>)}</div>
        </div>
      );
    }   
  }

  export default SearchBar