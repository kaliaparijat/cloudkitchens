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
          orderMap: {},
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
      const orderLog = this.state.orderMap;
     // const newOrderIds = [];
      // orders are a sorted array, sent by second
      newOrders.forEach((order) => {
         orderLog[order.id] = orderLog[order.id] || [];
         orderLog[order.id].push(order);
      });

      const currentOrders = newOrders.concat(retainedOrders);
      this.setState({
          orders: currentOrders,
          orderMap: orderLog
      });
  }

  handleIsCooking = (value) => {
      this.setState({
          isCooking: value,
      });
  }

  applyFilterCriteria(order) {
      const {isHistorical, isCooking, searchText} = this.props;
      if (isHistorical) {
          return true;
      }
      if (isCooking) {
          return order.event_name === 'CREATED';
      }
      return this.inactiveStates.indexOf(order.event_name) < 0;
  }

  getOrdersToDisplay = () => {
      const { orderMap, isHistorical, isCooking, searchText } = this.state;
      const isDefault = !isHistorical && !isCooking && searchText === '';
      let ordersToDisplay = [];
      if (isDefault) {
          Object.values(orderMap).forEach((order) => {
              if (Array.isArray(order)) {
                  const latestStateOfOrder = order[order.length - 1];
                  ordersToDisplay.push(latestStateOfOrder);
              }
          });
      }
      return ordersToDisplay;
  }

  render() {
      const { searchText, isCooking, isHistorical, orderMap } = this.state;
      const displayOrders = this.getOrdersToDisplay();
      return (
          <div className="App">
              <SearchBar searchText={searchText}
                         isHistorical={isHistorical}
                         isCooking={isCooking}
                         onCookingChange={this.handleIsCooking}
              />
              <OrderTable orders={displayOrders}
              />
          </div>
      );
  }
}

export default App;
