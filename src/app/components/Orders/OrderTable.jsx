import React from 'react';
import capitalize from 'lodash.capitalize';
import { makeStyles } from '@material-ui/core/styles';
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
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="left">Status</TableCell>
          <TableCell align="left">Food item</TableCell>
          <TableCell align="left">Order location</TableCell>
          <TableCell align="left">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.orders.map((order) => (
          <TableRow key={order.id} data-testid={order.id} >
            <TableCell align="left">
              { props.editingOrderId !== order.id ?
                capitalize(order.event_name.toLowerCase().replace('_', ' ')) :
                (
                  <Select
                    value={order.event_name}
                    onChange={props.handleOrderUpdate}
                    aria-label={`select-menu-${order.id}`}
                  >
                    <MenuItem value="CREATED">Created</MenuItem>
                    <MenuItem value="COOKED">Cooked</MenuItem>
                    <MenuItem value="DRIVER_RECEIVED">Driver received</MenuItem>
                    <MenuItem value="DELIVERED">Delivered</MenuItem>
                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  </Select>
                )
              }
            </TableCell>
            <TableCell align="left">{order.name}</TableCell>
            <TableCell align="left">{order.destination}</TableCell>
            <TableCell align="left">
              <button
                onClick={() => props.handleEdit(order.id)}
                aria-label={`action-button-${order.id}`}
              >
                {props.editingOrderId === order.id? 'Done' : 'Edit'}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};

