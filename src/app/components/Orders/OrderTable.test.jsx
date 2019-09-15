import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import { SimpleOrderTable, OrderDetailRow}  from "./OrderTable";

const sortedOrders = [
    {
        "destination": "801 Toyopa Dr, Pacific Palisades, CA 90272",
        "event_name": "CREATED",
        "id": "4b76edbf",
        "name": "Cheese pizza",
        "sent_at_second": 4
    },
    {
        "destination": "801 Toyopa Dr, Pacific Palisades, CA 90272",
        "event_name": "CANCELLED",
        "id": "4b76edzf",
        "name": "Cheese pizza",
        "sent_at_second": 10
    },
    {
        "destination": "801 Toyopa Dr, Pacific Palisades, CA 90272",
        "event_name": "DELIVERED",
        "id": "4b76edbf",
        "name": "Cheese pizza",
        "sent_at_second": 17
    },
];

describe('OrderTable', () => {

    test.skip('shall render only the active orders by default', () => {
        const wrapper = shallow(<OrderTable orders={sortedOrders} isHistorical={false} isCooking={false}/>)
        expect(wrapper.find('OrderDetailRow').length).toEqual(1)
    });

    test.skip('shall display orders in descending order of the time the orders were sent', () => {
        const wrapper = shallow(<OrderTable orders={sortedOrders} isHistorical={false} isCooking={false}/>)
        const instance = wrapper.instance();
        const displayOrders = instance.getOrdersToDisplay();
        let priorOrderTime = 0;
        for (let i = displayOrders.length; i = 0; i--) {
            const order = displayOrders[i];
            expect(order.sent_at_second).toBeGreaterThan(priorOrderTime);
            priorOrderTime = order.sent_at_second;
        }
    });

    test.skip('shall display only orders that are currently in a CREATED state if isCooking is set to true', () => {
        const wrapper = shallow(<OrderTable orders={sortedOrders} isHistorical={false} isCooking={true}/>)
        console.log(wrapper.find('OrderDetailRow'));

    });
});

describe('SimpleOrderTable', () => {
    it('it receives an array of orders as a prop and renders them as a table', () => {
        const { asFragment } = render(<SimpleOrderTable orders={sortedOrders} />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe('OrderDetailRow', () => {

    it('it receives order keys as properties and renders them as a table row', () => {
        const { asFragment } = render(<OrderDetailRow
            name="order_name"
            destination="901 Brindaban 2A, Poonam Nagar, Andheri (E), Mumbai, 400093"
            orderStatus="Cooking"
            key="#932abc"/> );
        expect(asFragment()).toMatchSnapshot()
    });
})