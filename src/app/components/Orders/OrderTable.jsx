import React, { useState } from 'react';
import capitalize from 'lodash.capitalize';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
  table: {
    minWidth: 650,
  },
  button: {
    border: 'none',
  }
}));

export const SimpleOrderTable = (props) => {
  const classes = useStyles();
  const [ editOrder, setEditOrder ]= useState('0');

  const handleClick = (event) => {
    event.preventDefault();
    setEditOrder(event.target.value);
  };

  const handleChange = (event) => {
    const { handleOrderUpdate } = props;
    props.handleOrderUpdate(event.target.name, event.target.value);
  }

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="left"> Order For</TableCell>
          <TableCell align="left">Current status</TableCell>
          <TableCell align="left">Order name</TableCell>
          <TableCell align="right">Change order status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.orders.map((order) => (
          <TableRow key={order.id} data-testid={order.id}>
            <TableCell align="left">{order.name}</TableCell>
            <TableCell align="left">{order.destination}</TableCell>
            {(editOrder !== order.id)?
              ( <TableCell align="left">{capitalize(order.event_name.toLowerCase())}</TableCell>) : (
                <TableCell align="left">
                  <Select
                    change={handleChange}
                    value={order.event_name}>
                    <MenuItem value={order.event_name}>{order.event_name}</MenuItem>
                    <MenuItem value='CANCELLED'>Cancelled</MenuItem>
                    <MenuItem value='COOKED'>Cooked</MenuItem>
                </Select></TableCell>) }
            <TableCell align="right">
                <button
                className={classes.button}
                value={order.id}
                onClick={handleClick}
                >Edit
                </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};

