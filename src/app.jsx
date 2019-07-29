import React from 'react';
import './App.css';
import OrderInfo from './components/OrderInfo';
import SearchBar from './components/SearchBar/SearchBar';


function App() {
  return (
      <div class="App">
        <SearchBar />
        <OrderInfo />
      </div>
  );
}

export default App;
