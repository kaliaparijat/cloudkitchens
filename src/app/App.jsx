import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core";
import openSocket from 'socket.io-client';
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
      const socket = openSocket('http://localhost:8080');
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
      })
    }

    this.setState({
      isHistorical: false,
      searchText: '',
      isCooking: false,
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

  getDisplayOrders = () => {
      const { orders, isHistorical, isCooking, searchText } = this.state;
      return Object.values(orders).filter((order) => {
        if (isCooking) {
          return order.event_name === 'CREATED';
        }
        if (isHistorical) {
          return order.event_name === 'CANCELLED' || order.event_name === 'DELIVERED';
        }
        return order.event_name !== 'CANCELLED' && order.event_name !== 'DELIVERED';
      });
  }

  render() {
      const { searchText, isCooking, isHistorical, orderMap } = this.state;
      const displayOrders = this.getDisplayOrders();
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

export default App;
