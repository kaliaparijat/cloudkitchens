import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';

import { SimpleOrderTable }  from "./OrderTable";

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


describe('SimpleOrderTable with no editingOrderId prop', () => {

    const handleOrderEdit = jest.fn();

    let renderedOrderTable;

    beforeEach(() => {
        renderedOrderTable = render(<SimpleOrderTable orders={sortedOrders} handleEdit={handleOrderEdit}/>);
    });

    it('should invoke handleEdit correctly with the right order ID parameter when the user clicks on an Edit button', () => {
        const { getByTestId, asFragment } = renderedOrderTable;
        const editButton = getByTestId('action-button-4b76edxf');
        fireEvent.click(editButton);
        expect(handleOrderEdit).toHaveBeenCalled();
        expect(handleOrderEdit).toHaveBeenCalledWith('4b76edxf');
    });

    describe ('SimpleOrderTable with an editingOrderId prop', () => {
        const handleOrderStatusUpdate = jest.fn();
        let selectMenu;

        beforeEach(() => {
           renderedOrderTable = render(
             <SimpleOrderTable
             orders={sortedOrders}
             handleEdit={handleOrderEdit}
             handleUpdate={handleOrderStatusUpdate}
             editingOrderId='4b76edxf'/>);
           const { getByLabelText } = renderedOrderTable;
           selectMenu = getByLabelText('select-menu-4b76edxf');
        });

        it('should render a select menu under the status column for the order that has the orderID same as editingOrderId', () => {
            expect(selectMenu).toBeTruthy();
        });
    });

});
