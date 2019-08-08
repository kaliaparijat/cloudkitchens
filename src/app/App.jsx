import React from 'react';
import './App.css';
import OrderTable from './components/Orders/OrderInfo';
import SearchBar from './components/SearchBar/SearchBar';
import OrderData from "../data/challenge_data";

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          searchText: '',
          isCooking: true,
          isHistorical: true,
          orders: [],
      };
  }

  async componentDidMount() {
      const newOrders = this.receiveOrders();
      // this is where the orderData is received based on a socket.io call
      const response = await fetch('/api/orders', );
      console.log(await response.json());
      this.setState({ orders: newOrders });
  }

  componentDidUpdate() {
      console.log('component did update');

      // faking a network call that would typically use sockets using setInterval
      /*
      let counter = this.state.orders[0].sent_at_second;
      const sortedOrders = this.sortedOrdersBySecond;
      const orderIntervalId = setInterval(() => {
          counter += 1;
          if (counter >= sortedOrders.length) {
              debugger;
              console.log("calls clear interval");
              clearInterval(orderIntervalId);
          }

          if (Array.isArray(sortedOrders[counter]) && sortedOrders[counter]) {
              this.handleNewReceivedOrders(sortedOrders[counter], counter);
          }
      }, 1000);*/

  }

  receiveOrders() {
      OrderData.sort((a, b) => a.sent_at_second - b.sent_at_second);
      // send the initial orders
      this.sortedOrdersBySecond = [];
      OrderData.forEach((o) => {
          if (!this.sortedOrdersBySecond[o.sent_at_second]) {
              this.sortedOrdersBySecond[o.sent_at_second] = [];
          }
          this.sortedOrdersBySecond[o.sent_at_second].push(o);
      });
      const initialOrders = this.sortedOrdersBySecond.find(o =>  Array.isArray(o) && o.length !== 0 );
      return initialOrders;
  }
  
  handleNewReceivedOrders(newOrders, receivedTimeInSeconds) {
      console.log(`${receivedTimeInSeconds}`, newOrders);
      // update the state with newOrders
      // state orders can only have a unique set of orders that are displayed, this is likely the responsibility of the orderTable, the orderTable displays a set of orders
      const currentOrders = this.state.orders;
      this.setState({orders: currentOrders.concat(newOrders)} );
  }

  handleIsCooking = (value) => {
      this.setState({
          isCooking: value,
      });
  }

  render() {
      const { searchText, isCooking, isHistorical, orders } = this.state;
      return (
          <div className="App">
              <SearchBar searchText={searchText}
                         isHistorical={isHistorical}
                         isCooking={isCooking}
                         onCookingChange={this.handleIsCooking}
              />
              <OrderTable orders={orders}
                          isHistorical={isHistorical}
                          isCooking={isCooking}
              />
          </div>
      );
  }
}

export default App;
