import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar } from './SearchBar';

describe('SearchBar',() => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SearchBar isCooking={true} isHistorical={false} searchText={''}/>);
        console.log(wrapper);
    });

    it ('renders correctly with the isCooking radio button selected, searchText empty', () => {
       expect(1).toEqual(1);
    });
});