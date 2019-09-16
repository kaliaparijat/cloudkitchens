import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import { SimpleOrderTable, OrderDetailRow}  from "./OrderTable";

const sortedOrders = [
    {
        "destination": "801 Toyopa Dr, Pacific Palisades, CA 90272",
        "event_name": "CREATED",
        "id": "4b76edxf",
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


describe('SimpleOrderTable', () => {
    it('it receives an array of orders as a prop and renders them as a table', () => {
        const { asFragment } = render(<SimpleOrderTable orders={sortedOrders} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
