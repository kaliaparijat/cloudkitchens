import './OrderInfo.css';
import React from 'react';

class OrderTable extends React.Component {
    render() {
        const { orders } = this.props;
        return (
            <table>
                <thead>
                <tr>
                    <th>Order for</th>
                    <th>Current status</th>
                    <th>Order name</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) =>
                    <OrderDetailRow
                        key={index}
                        name={order.name}
                        orderStatus={order.event_name}
                        destination={order.destination}
                    ></OrderDetailRow>
                )}
                </tbody>
            </table>
        )
    }
}

class OrderDetailRow extends React.Component {
    render() {
        const { name, orderStatus, destination } = this.props;
        return (
            <tr>
                <td>{destination}</td>
                <td>{orderStatus}</td>
                <td>{name}</td>
            </tr>
        );
    }
}

export default OrderTable;