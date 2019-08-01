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
          isCooking: true,
          isHistorical: true,
      };
  }

  handleIsCooking = (value) => {
      this.setState({
          isCooking: value,
      });
      console.log(this.state.isCooking);
  }

  render() {
      const { searchText, isCooking, isHistorical } = this.state;
      return (
          <div className="App">
              <SearchBar searchText={searchText}
                         isHistorical={isHistorical}
                         isCooking={isCooking}
                         onCookingChange={this.handleIsCooking}
              />
              <OrderTable orders={OrderData}
                          isHistorical={isHistorical}
                          isCooking={isCooking}
              />
          </div>
      );
  }
}

export default App;
