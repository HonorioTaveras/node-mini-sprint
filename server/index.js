const http = require('http');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'Catch a man, feed him for a day. Teach a man to fish, feed him for life',
  'A man never walks thrpough the same river twice, for he is not the same man, and it is nopt the same river',
  'Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.',
  'All generalizations are false, including this one.',
  'When we remember we are all mad, the mysteries disappear and life stands explained.'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
  }

  // TODO: GET ONE
  if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    console.log('made it to get route!');
    let quote = quotes[getRandomInt(0, quotes.length)];
    req.writeHead(200, headers);
    req.end(quote);
  }
  // TODO: POST/CREATE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
    //YOUR CODE HERE
    console.log('made it to post route');
    let body = '';
    // req.on ??
    // extract quote from request
    res.on('data', (chunk) => {
      // concat to body
      body += chunk;
    });
    res.on('end', () => {
      req.writeHead(200, headers);
      res.end(body);
    });
  }

//CATCH ALL ROUTE
  else {
    res.writeHead(404,headers);
    res.end('Page not found');

  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
