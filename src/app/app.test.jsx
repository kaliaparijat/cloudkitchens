import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { shallow } from "enzyme/build";
import { SearchBar } from "./components/SearchBar/SearchBar";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
