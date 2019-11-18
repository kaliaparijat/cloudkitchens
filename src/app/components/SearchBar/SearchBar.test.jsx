import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar',() => {
  let searchBar;

  beforeAll(() => {
    searchBar = render(<SearchBar searchText="33" isHistorical={false} isCooking={false} searchByCriteria={jest.fn()} />)
  });

  it ('dummy', () => {
    expect(1).toEqual(1);
  })

});

