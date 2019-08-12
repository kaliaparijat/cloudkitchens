import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { shallow } from "enzyme/build";
import OrderTable from "./OrderTable";

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
        "id": "4b76edbf",
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

    it('shall render only the active orders by default', () => {
        const wrapper = shallow(<OrderTable orders={sortedOrders} isHistorical={false} isCooking={false}/>)
        expect(wrapper.find('OrderDetailRow').length).toEqual(1)
    });

    it('shall display orders in descending order of the time the orders were sent', () => {
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

    it('shall display only orders that are currently in a CREATED state if isCooking is set to true', () => {
        const wrapper = shallow(<OrderTable orders={sortedOrders} isHistorical={false} isCooking={true}/>)
        console.log(wrapper.find('OrderDetailRow'));

    });
});