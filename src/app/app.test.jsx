import React from 'react';
import App, { isActiveOrder } from './app';
import { render, fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';
import { initialMockData, subsequentMockData } from '../data/mocks';



jest.mock('socket.io-client', () => () => ({
  emit: jest.fn(),
  on: (serverMessage, callback) => {
    return callback(initialMockData);
  }
}));

const isHistorical = order => order.event_name === 'CANCELLED' || order.event_name === 'DELIVERED';
const isCooked = (order, searchText) => order.sent_at_second < parseInt(searchText) && order.event_name === 'COOKED';

describe('<App />', () => {

  describe('using react testing library', () => {
   let app;

    beforeEach(() => {
      app = render(<App />)
    })

    it ('should display only active orders from the orders it receives', () => {
      const { getByTestId, getByText } = app;
      const renderedOrders = [];
      const activeOrders = mockData.filter((mockOrder) => isActiveOrder(mockOrder)); // filter the active orders from the mock data

      activeOrders.forEach((activeOrder) => {
        expect(getByTestId(activeOrder.id).length).toEqual(1); // expect that only activeOrders from the mockData set have been rendered
      });

    });

    it ('should update the order table when it receives new and updated orders with the right information', () => {
      const { getByTestId, getByText } = app;
      const activeOrdersFromMock = mockData.filter((mockOrder) => isActiveOrder(mockOrder));
      const initialRenderedOrders = [];

      activeOrdersFromMock.forEach((activeOrder) => {
        initialRenderedOrders.push(getByTestId(activeOrder.id));
      });

      expect(initialRenderedOrders.length).toEqual(activeOrdersFromMock.length); // if the length is NOT the same, then an expected order was not rendered, test fails
      // wait for a time interval (process.nextTick)
      // retrieve all orders that have been displayed
      // get active orders that have been displayed as we;;
      // expect: some of these updated orders should have their status updated, comparing them to initialRenderedOrders
      // some new orders

    });

    it ('should NOT update the order table with new orders when any order ‘‘is being currently edited', () => {

    });

    it ('should update an order with the new status (if any, selected by the user) once an order is updated by the user', () => {

    });

    it ('should render any new orders it had received once the user has finished editing an order', () => {

    });


  });

  describe('Enzyme tests', () => {

    it ('should render  processed orders (delivered or cancelled) when the user filters the display by selecting the radio button next to "All past orders"', () => {
      const app = mount(<App />);
      const radio = app.find('input[id="historical-filter"]');
      radio.simulate('change', { target: {name: 'filter', value:'historical', checked: 'true'}});

      const expectedOrderIds = mockData.filter((mockOrder) => isHistorical(mockOrder)).map(mockOrder => mockOrder.id);

      const renderedOrderIds = [];
      // find the data-testid of the rows that were rendered
      app.find('tbody tr').forEach(row => {
        renderedOrderIds.push(row.get(0).props['data-testid']);
      });
      // these should match with the expectedOrders, implying only historical orders were rendered
      expect(renderedOrderIds).toEqual(expectedOrderIds);
    });

    it ('should render orders that are currently in a "CREATED" state when the user filters the list by "Cooking now"', () => {
      const app = mount(<App />);
      const radio = app.find('input[id="cooking-filter"]');
      radio.simulate('change', { target: { name: 'filter', value:'cooking', checked: 'true'}});
      const expectedOrderIds = mockData.filter((mockOrder) => mockOrder.event_name === 'CREATED').map(mockOrder => mockOrder.id);
      const renderedOrderIds = []
      app.find('tbody tr').forEach(row => {
        renderedOrderIds.push(row.get(0).props['data-testid']);
      });
      expect(renderedOrderIds).toEqual(expectedOrderIds);
    });

    it ('should display orders that have been cooked (entered the COOKED state) in the last X seconds, when the user manually enters X', () => {
      const app = mount(<App />);
      const search = app.find('input[name="cooked"]');
      search.simulate('change', { target: { name: 'cooked', value: '4' }});
      const expectedOrderIds = mockData.filter((mockOrder) => isCooked(mockOrder, '4')).map(mockOrder => mockOrder.id);
      const renderedOrderIds = []
      app.find('tbody tr').forEach(row => {
        renderedOrderIds.push(row.get(0).props['data-testid']);
      });
      expect(renderedOrderIds).toEqual(expectedOrderIds);
    });
  });

});
