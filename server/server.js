// TODO: change the following to ES6?
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var OrderData = require("../public/data/challenge_data.json"); // TODO: obsolete challenge_data available in src folder

const groupOrdersByTimeReceived = (orders) => {
    orders.sort((a, b) => a.sent_at_second - b.sent_at_second);
    // send the initial orders
    const groupedOrders = [];
    orders.forEach((o) => {
        if (!groupedOrders[o.sent_at_second]) {
            groupedOrders[o.sent_at_second] = [];
        }
        groupedOrders[o.sent_at_second].push(o);
    });
    return groupedOrders;
};

const displayOrders = groupOrdersByTimeReceived(OrderData);

app.get('/api/modify_order/order_id', function(request, response) {
  response.json({'foo': 'bar'});
});

io.on('connection', function(socket) {

  socket.on('ready', () => {
      let seconds = 0;
      const totalOrders = displayOrders.length;
      const intervalId = setInterval(() => {
          seconds++;
          if (displayOrders[seconds]) {
              socket.emit('ready', displayOrders[seconds]);
          }
      }, 1000);
  });
});


http.listen(8080, function(){
  console.log('listening on *:8080');
});
