import React from 'react';
import './App.css';
import OrderInfo from './components/OrderInfo';
import SearchBar from './components/SearchBar/SearchBar';
import OrderData from "./data/challenge_data";


class App extends React.Component {

  constructor() {

  }

  onInit() {

  }

  handleFilterTextChange() {

  }

  handleCookingChecked() {

  }

  handleOnHistoricalChecked() {

  }

  displayActiveOrders() {

  }

  render() {
    return (
      <div class="App">
          <SearchBar onFilterTextChange={this.handleFilterTextChange}
                     onCookingChecked={this.handleCookingChecked}
                     onHistoricalChecked={this.handleOnHistoricalChecked}/>
          <OrderInfo orders={OrderData} filter={this.displayActiveOrders}/>
      </div>
    );
  }
}

export default App;
