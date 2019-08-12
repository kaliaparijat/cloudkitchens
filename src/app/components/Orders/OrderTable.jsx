import './OrderTable.css';
import React from 'react';

class OrderTable extends React.Component {

    inactiveStates = ['DELIVERED', 'CANCELLED'];

    applyFilterCriteria(order) {
        const { isHistorical, isCooking } = this.props;
        if (isHistorical) {
            return true;
        }
        if (isCooking) {
            return order.event_name === 'CREATED';
        }
        return this.inactiveStates.indexOf(order.event_name) < 0;
    }

    getOrdersToDisplay() {
        const { orders } = this.props;
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