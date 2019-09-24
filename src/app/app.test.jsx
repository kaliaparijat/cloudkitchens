import React from 'react';
import App, { isActiveOrder } from './app';
import { render, fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';


const application = {
  applicationType: '',
};
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
    "sent_at_second": 3
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
    "sent_at_second": 45
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

  it ('should render only active orders from the set of orders it received as default', () => {
    const { getByTestId, getByText} = render(<App />);

    const renderedOrders = [];
    const activeOrders = mockData.filter((mockOrder) => isActiveOrder(mockOrder));

    activeOrders.forEach((activeOrder) => {
      renderedOrders.push(getByTestId(activeOrder.id))
    });
    expect(renderedOrders.length).toEqual(activeOrders.length);
  });

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
