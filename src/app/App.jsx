import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core";
import socketConnection from 'socket.io-client';
import { SimpleOrderTable } from './components/Orders/OrderTable';
import SearchBar from './components/SearchBar/SearchBar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

export const isActiveOrder = (eventName) => {
  const activeOrderStates = ['CREATED', 'COOKED', 'DRIVER_RECEIVED'];
  return activeOrderStates.indexOf(eventName) > -1;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isCooking: false,
      isHistorical: false,
      orders: {},
    };
  }

  async componentDidMount() {
    const socket = socketConnection('http://localhost:8080');
    socket.emit('ready', "client ready");
    socket.on('ready', (newOrders) => {
      this.handleNewReceivedOrders(newOrders);
    });
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
    const {orders, isHistorical, isCooking, searchText} = this.state;
    return Object.values(orders).filter((order) => {
      if (searchText !== '') {
        return order.sent_at_second < parseInt(searchText);
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

  render() {
    const {searchText, isCooking, isHistorical} = this.state;
    const displayOrders = this.getDisplayOrders();
    {
      return (
        <Container maxWidth="lg">
          <Paper>
            <SearchBar searchText={searchText}
                       isHistorical={isHistorical}
                       isCooking={isCooking}
                       searchByCriteria={this.updateSearchCriteria}
            />
            <SimpleOrderTable orders={displayOrders}/>
          </Paper>
        </Container>
      );
    }
  }
}

export default App;
