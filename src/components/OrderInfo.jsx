import './OrderInfo.css';
import React from 'react';

class OrderInfo extends React.Component {
    render() {
        const { orders, filter } = this.props;
        const displayOrders = orders.map(order => filter.call(null, order));
        return (
            <table>
                <thead>
                <tr>
                    <th>Order for</th>
                    <th>Current status</th>
                    <th>Order name</th>
                </tr>
                </thead>
                {displayOrders.map(order =>
                    <OrderDetailRow
                        name={order.name}
                        orderStatus={order.event_name}
                        destination={order.destination}
                    ></OrderDetailRow>
                )}
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

export default OrderInfo;