import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const SearchBar = (props) => {
  return (
    <form className="searchBar">
      <label htmlFor="cooked">Get all cooked orders in past <input
        type="text"
        name="cooked"
        defaultValue={props.searchText}
      /> seconds</label>
      <p>
        <Radio
          name="filter"
          value="active"
          onChange={props.searchByCriteria}
          checked={!props.isCooking && !props.isHistorical}
          defaultChecked
        />
        <label htmlFor="active"
               name="activeOrders-label"
        >
          Active orders
        </label>
        <Radio
          name="filter"
          value="cooking"
          checked={props.isCooking}
          onChange={props.searchByCriteria}
        />
        <label htmlFor="cooking"
               name="cooking-label"
        >
          Cooking now
        </label>
        <Radio
          name="filter"
          value="historical"
          checked={props.isHistorical}
          onChange={props.searchByCriteria}
        />
        <label htmlFor="historical"
               name="historical-label"
        >
          All past orders
        </label>
      </p>
    </form>
  )
};

export default SearchBar;