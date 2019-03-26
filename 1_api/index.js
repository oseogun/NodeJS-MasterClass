//Dependencies
var http = require('http');
var url = require('url');

//Create http server
httpServer = http.createServer(function(req, res){
  unifiedResponse(req, res);
});

httpServer.listen(3000, function(){
  console.log('Server is listening on port 3000');
});

var unifiedResponse = function(req, res) {

  // Get url and parse it
  var parsedUrl = url.parse(req.url,true);

  // Get path from url
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the headers as an object
  var headers = req.headers;

  //Choose handler to handle request
  var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

  //Route request to the handler specified in router
  chosenHandler(function(statusCode,payload){

      //Use the status code defined by handler or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      //use the payload called back by the handler or default to empty object
      payload = typeof(payload) == 'object' ? payload : {};

      //Convert payload to string
      var payloadString = JSON.stringify(payload);

      //Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log('Returning this response: ',statusCode,payloadString);

  });

};

// Define handlers
var handlers = {};

// Ping handler
handlers.hello = function(callback){
  //Return the response
 callback(406, {'message' : 'Hello - This is my submission for assignment one'});
};

// Not found handler
handlers.notFound = function(callback){
  callback(404);
};

// Define a request router
var router = {
    'hello' : handlers.hello
};
