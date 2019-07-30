import React from 'react';
import './App.css';
import OrderTable from './components/OrderInfo';
import SearchBar from './components/SearchBar/SearchBar';
import OrderData from "./data/challenge_data";


class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          searchText: '',
          isCooking: false,
          getHistorical: false,
      };


  }

  onInit() {

  }

  handleSearchText() {

  }

  handleCookingChecked() {

  }

  handleOnHistoricalChecked() {

  }

  displayActiveOrders() {

  }

  render() {
    return (
      <div className="App">
          <SearchBar />
          <OrderTable orders={OrderData} />
      </div>
    );
  }
}

export default App;
