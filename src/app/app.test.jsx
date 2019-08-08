import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {shallow} from "enzyme/build";
import {SearchBar} from "./components/SearchBar/SearchBar";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App',() => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SearchBar isCooking={true} isHistorical={false} searchText={''}/>);
    console.log(wrapper);
  });

  it ('renders correctly with the isCooking radio button selected, searchText empty', () => {
    expect(1).toEqual(1);
  });
});
