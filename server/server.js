var app = require('express')();
var http = require('http').createServer(app);
console.log("invoked");
app.get('/api/orders', function(request, response) {
  console.log("api hit");
  response.json({'foo': 'bar'});
});
http.listen(8080, function(){
  console.log('listening on *:8080');
});
