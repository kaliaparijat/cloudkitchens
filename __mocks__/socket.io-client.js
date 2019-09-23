const socket_io_client = jest.genMockFromModule('socket.io-client');
const mockOpenSocket = function(str) {
  return {
    emit: jest.fn(),
    on: jest.fn().mockReturnValueOnce([
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
          "sent_at_second": 45
        },
      ])
  };
};

socket_io_client.openSocket = mockOpenSocket;

export default socket_io_client;