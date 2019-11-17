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
    orders: {},
  }

  editingOrderId;

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
      orderMap[order.id] = order
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

    if (event.target.name === 'cooked') {
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

    this.editingOrderId = orderId;
    this.setState({ isEditing: !this.state.isEditing });
    // once the order has been updated, invoke forceUpdate so that the order can be shown to the user
  }

  handleOrderUpdate = (event, orderId) => {
   const value = event.currentTarget.value;
   if (this.state.orders[orderId].event_name) {

   }
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
            editingOrderId={this.editingOrderId}
          />
        </Paper>
      </Container>
    )
  }
}

export default App;
