import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import socketConnection from 'socket.io-client';
import { SimpleOrderTable } from './components/Orders/OrderTable';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

export const isActiveOrder = (eventName) => {
  const activeOrderStates = ['CREATED', 'COOKED', 'DRIVER_RECEIVED'];
  return activeOrderStates.indexOf(eventName) > -1;
}

class App extends React.Component {

  state = {
    searchText: '',
    isCooking: false,
    isHistorical: false,
    isEditing: false,
    editingOrderId: false,
    orders: {},
  };

  async componentDidMount() {
    const socket = socketConnection('http://localhost:8080');
    socket.emit('ready', "client ready");
    socket.on('ready', (newOrders) => {
       this.handleNewReceivedOrders(newOrders);
    });
  }

  shouldComponentUpdate() {
    return !this.state.isEditing; // prevent updates to the order table if it is currently being edited
  }

  handleNewReceivedOrders(newOrders) {
    const orderMap = this.state.orders;
    newOrders.forEach((order) => {
        const currOrder = orderMap[order.id] || order;
        // if the order exists in the app state, update all properties but for name, destination and event_name
       // if it did not exist, then the following ops don't really matter
        currOrder.name = order.name;
        currOrder.destination = order.destination;
        currOrder.event_name = order.event_name;
        currOrder.updated = false;
        orderMap[order.id] = currOrder;
    });
    this.setState({
      orders: orderMap
    });
  }

  updateSearchCriteria = (event) => {
    if (event.target.value === 'cooking') {
      return this.setState({
        isCooking: !this.state.isCooking,
        isHistorical: false,
        searchText: '',
      });
    }

    if (event.target.value === 'historical') {
      return this.setState({
        isHistorical: !this.state.isHistorical,
        searchText: '',
        isCooking: false,
      });
    }

    if (event.target.name === 'search-filter') {
      return this.setState({
        isHistorical: false,
        isCooking: false,
        searchText: event.target.value,
      });
    }

    // default: returns active orders
    this.setState({
      isHistorical: false,
      searchText: '',
      isCooking: false,
    });
  }


  getDisplayOrders = () => {
    const { orders, isHistorical, isCooking, searchText } = this.state;
    return Object.values(orders).filter((order) => {
      if (searchText !== '') {
        return order.sent_at_second < parseInt(searchText) && order.event_name === 'COOKED';
      }
      if (isCooking) {
        return order.event_name === 'CREATED';
      }
      if (isHistorical) {
        return order.event_name === 'CANCELLED' || order.event_name === 'DELIVERED';
      }
      return isActiveOrder(order.event_name);
    });
  }

  editOrder = (orderId) => {
    this.setState({
      isEditing: !this.state.isEditing,
      editingOrderId: orderId
    });
  }

  updateOrderStatus = (event, orderId) => {
    this.setState(prevState => {
      const order = prevState.orders.orderId;
      order.event_name = event.target.value;
      order.updated = true;
      return {
        orders: {orderId: order},
        isEditing: false
      }
    });
  }


  render() {
    const { searchText, isCooking, isHistorical } = this.state;
    const displayOrders = this.getDisplayOrders();
    return  (
      <Container maxWidth="lg" className="app">
        <Paper className="paper">
          <SearchBar searchText={searchText}
                     isHistorical={isHistorical}
                     isCooking={isCooking}
                     searchByCriteria={this.updateSearchCriteria}
          />
          <SimpleOrderTable
            orders={displayOrders}
            handleEdit={this.editOrder}
            handleUpdate={this.updateOrderStatus}
            editingOrderId={this.state.editingOrderId}
          />
        </Paper>
      </Container>
    )
  }
}

export default App;
