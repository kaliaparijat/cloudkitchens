import React from 'react';
import capitalize from 'lodash.capitalize';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
          <TableCell align="left">Food item</TableCell>
          <TableCell align="left">Order location</TableCell>
          <TableCell align="left">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.orders.map((order) => (
          <TableRow key={order.id} data-testid={order.id} >
            <TableCell align="left">{order.name}</TableCell>
            <TableCell align="left">{order.destination}</TableCell>
            <TableCell align="left">{capitalize(order.event_name.toLowerCase().replace('_', ' '))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};

