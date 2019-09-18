import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  return (
    <form className="searchBar">
      <label htmlFor="cooked">Get all cooked orders in past</label>
      <TextField
        type="text"
        name="cooked"
        value={props.searchText}
        placeholder="seconds"
        className={classes.textField}
        margin="normal"
        onChange={props.searchByCriteria}
      />
      <p>
        <Radio
          name="filter"
          value="active"
          onChange={props.searchByCriteria}
          checked={!props.isCooking && !props.isHistorical && props.searchText === ''}
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