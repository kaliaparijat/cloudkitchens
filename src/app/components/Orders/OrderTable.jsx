import './OrderTable.css';
import React from 'react';

/*
class OrderTable extends React.Component {

    inactiveStates = ['DELIVERED', 'CANCELLED'];

    componentDidMount() {
        const { orderMap } = this.props;
        const allOrders = Object.values(orderMap);
        this.displayOrders = allOrders.forEach((order) => {

        })
    }

    getOrdersToDisplay() {
        const { orderMap } = this.props;
        const orders = Object.values(orderMap);
        orders.forEach((order) => {

        })
        orders.sort((a, b) => {
            return b.sent_at_second - a.sent_at_second;
        });
        return orders;
    }

    render() {
       const displayOrders = this.getOrdersToDisplay();
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
                {
                    displayOrders.map((order) => {
                        if (this.applyFilterCriteria(order)) {
                            return <OrderDetailRow
                                key={order.id}
                                name={order.name}
                                destination={order.destination}
                                orderStatus={order.event_name}
                            />
                        }
                        else {
                            return;
                        }
                    })
                }
                </tbody>
            </table>
        )
    }
}*/

export const SimpleOrderTable = (props) =>(
    <table>
        <thead>
        <tr>
            <th>Order for</th>
            <th>Current status</th>
            <th>Order name</th>
        </tr>
        </thead>
        <tbody>
        {props.orders.map((order) => (
            <OrderDetailRow
                key={order.id}
                name={order.name}
                destination={order.destination}
                orderStatus={order.event_name}
            />
        ))}
        </tbody>
    </table>
);


export const OrderDetailRow = (props) => {
    const { name, destination, orderStatus } = props;
    return (
        <tr>
            <td>{name}</td>
            <td>{destination}</td>
            <td>{orderStatus}</td>
        </tr>
    )
};

