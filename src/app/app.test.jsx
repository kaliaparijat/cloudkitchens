import React from 'react';
import App, { isActiveOrder } from './app';
import { render, fireEvent } from '@testing-library/react';

const mockData = [
  {
    "destination": "801 Toyopa Dr, Pacific Palisades, CA 90272",
    "event_name": "CREATED",
    "id": "4b76edbf",
    "name": "Cheese pizza",
    "sent_at_second": 4
  },
  {
    "destination": "139 E 66th St, Los Angeles, CA 90003",
    "event_name": "CREATED",
    "id": "43bf7f03",
    "name": "Cheese burger",
    "sent_at_second": 4
  },
  {
    "destination": "7697 Everest Pl, Rancho Cucamonga, CA 91730",
    "event_name": "COOKED",
    "id": "e765bcfd",
    "name": "Vegan burger",
    "sent_at_second": 4
  },
  {
    "destination": "139 E 66th St, Los Angeles, CA 90003",
    "event_name": "DRIVER_RECEIVED",
    "id": "0b7d8f57",
    "name": "Roast beef sandwich",
    "sent_at_second": 4
  },
  {
    "destination": "2094 Cedar Ave, Long Beach, CA 90806",
    "event_name": "DELIVERED",
    "id": "b99810cd",
    "name": "Vegetarian lasagna",
    "sent_at_second": 4
  },
  {
    "destination": "1296 N Berkeley Ave, San Bernardino, CA 92405",
    "event_name": "CANCELLED",
    "id": "a801b621",
    "name": "Eggplant parmesan",
    "sent_at_second": 4
  },
];

jest.mock('socket.io-client', () => () => ({
  emit: jest.fn(),
  on: (serverMessage, callback) => {
    return callback(mockData);
  }
}));

const isHistorical = order => order.event_name === 'CANCELLED' || order.event_name === 'DELIVERED';
const isCooked = (order, searchText) => order.sent_at_second < parseInt(searchText) && order.event_name === 'COOKED';

describe('<App />', () => {

  describe('using react testing library', () => {
   let app;

    beforeEach(() => {
      app = render(<App />)
    });

    it ('should display only active orders from the orders it receives', () => {
      const { getByTestId, getByText } = app;
      const renderedOrders = [];
      const activeOrders = mockData.filter((mockOrder) => isActiveOrder(mockOrder)); // filter the active orders from the mock data

      activeOrders.forEach((activeOrder) => {
        expect(getByTestId(activeOrder.id).length).toEqual(1); // expect that only activeOrders from the mockData set have been rendered
      });

    });

    it ('should display only orders with the status "DELIVERED" or "CANCELLED" when the user filters the display by selects "All past orders" ', () => {
      const { getByLabelText, getAllByText, queryAllByText } = app;
      const historicalOrdersRadio = getByLabelText('All past orders');
      fireEvent.click(historicalOrdersRadio);

      const historicalOrders = getAllByText(/Delivered|Cancelled/i), otherOrders = queryAllByText(/Created|Cooked|Driver received/i);
      expect(historicalOrders.length).toEqual(2); // only two orders in the mock match the criteria
      expect(otherOrders.length).toEqual(0);
    });

    it ('should render orders that are currently in a "CREATED" state when the user filters the list by "Cooking now"', () => {
      const { getByLabelText, getAllByText, queryAllByText } = app;
      const cookingNowRadio = getByLabelText('Cooking now');
      fireEvent.click(cookingNowRadio);
      const ordersCreated = getAllByText(/Created/i), allOtherOrders = queryAllByText(/Cancelled|Cooked|Driver received|Delivered/i);
      expect(ordersCreated.length).toEqual(2);
      expect(allOtherOrders.length).toEqual(0);
    });

    it ('should display orders that have been cooked (entered the COOKED state) in the last X seconds, when the user manually enters X', () => {
      const { getByPlaceholderText, getAllByText, queryAllByText } = app;
      const searchTextField = getByPlaceholderText('seconds');
      fireEvent.change(searchTextField, { target: { value: '5'} } );
      const ordersCooked = getAllByText(/Cooked/i), allOtherOrders = queryAllByText(/Cancelled|Created|Driver received|Delivered/i);
      expect(ordersCooked.length).toEqual(1);
      expect(allOtherOrders.length).toEqual(0);
    });

    it ('should NOT update the order table with new orders when any order ‘‘is being currently edited', () => {

    });

    it ('should update an order with the new status (if any, selected by the user) once an order is updated by the user', () => {

    });

    it ('should render any new orders it had received once the user has finished editing an order', () => {

    });

    describe ('when the user wants to edit an order', () => {

      beforeEach(() => {
        const { getByTestId } = app;
        const editButton = getByTestId('action-button-4b76edbf')
        fireEvent.click(editButton);
      });

      it ('should display a dropdown menu containining different order statuses for the order the user wants to edit', () => {
        const { getAllByLabelText, getByLabelText } = app;
        // test that only one select menu was displayed
        const selectMenus = getAllByLabelText(/select-menu/);
        expect(selectMenus.length).toEqual(1);

        // test that the right select menu is displayed
        const selectMenu = getByLabelText('select-menu-4b76edbf');
        expect(selectMenu).toBeTruthy();
      });

      it ('should display a check icon in place of the edit icon for the order the user wants to edit', () => {

      });

      describe('when the user updates an order', () => {
        beforeEach(() => {
          const { getByTestId } = app;
          fireEvent.change(selectMenu, { target : { value : 'DRIVER_RECEIVED'}});
        });

        it('should display the orders updated status to the user', () => {

        });




      });
    });


  });
});
