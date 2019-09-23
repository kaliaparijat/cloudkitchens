import React from 'react';
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
    <div>
        <TextField
          error={isNaN(props.searchText)}
          type="text"
          name="cooked"
          value={props.searchText}
          placeholder="seconds"
          className={classes.textField}
          margin="normal"
          onChange={props.searchByCriteria}
          helperText="cooked in the past few seconds"
        />
      <div>
      <label htmlFor="active-filter"
      >
        <Radio
          name="filter"
          id="active-filter"
          value="active"
          onChange={props.searchByCriteria}
          checked={!props.isCooking && !props.isHistorical && props.searchText === ''}
        />
        Active orders
      </label>
      <label htmlFor="cooking-filter"
      >
        <Radio
          name="filter"
          value="cooking"
          id="cooking-filter"
          checked={props.isCooking}
          onChange={props.searchByCriteria}
        />
        Cooking now
      </label>
      <label htmlFor="historical-filter"
      >
        <Radio
          name="filter"
          value="historical"
          id="historical-filter"
          data-testid="historical-filter"
          checked={props.isHistorical}
          onChange={props.searchByCriteria}
        />
        All past orders
      </label>
      </div>
    </div>
  )
};

export default SearchBar;
