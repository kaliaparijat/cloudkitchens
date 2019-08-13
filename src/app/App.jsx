import React from 'react';
import './App.css';
import OrderTable from './components/Orders/OrderTable';
import SearchBar from './components/SearchBar/SearchBar';
import openSocket from 'socket.io-client';
class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          searchText: '',
          isCooking: true,
          isHistorical: true,
          orders: [], // only unique orders,
          orderLog: {}, // keeps a log of orders,
      };
  }

  async componentDidMount() {
      const socket = openSocket('http://localhost:8080');
      socket.emit('ready', "client ready");
      socket.on('ready', (newOrders) => {
          this.handleNewReceivedOrders(newOrders);
      });
  }

  handleNewReceivedOrders(newOrders) {
      const existingOrders = this.state.orders;
      const orderLog = this.state.orderLog;
      const newOrderIds = [];
      // orders are a sorted array, sent by second
      newOrders.forEach((order) => {
         newOrderIds.push(order.id);
         orderLog[order.id] = orderLog[order.id] || [];
         orderLog[order.id].push(order);
      });

      const retainedOrders = existingOrders.filter((order) => {
          return newOrderIds.indexOf(order.id) === -1;
      });
      const currentOrders = newOrders.concat(retainedOrders);
      this.setState({
          orders: currentOrders,
          orderLog: orderLog
      });
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
                          searchText={searchText}
              />
          </div>
      );
  }
}

export default App;
