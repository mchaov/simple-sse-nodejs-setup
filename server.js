const http = require('http');
const msg = " - Simple SSE server - ";
const port = 5000;

// Create basic server
http.createServer(function (request, response) {
    
    // answer only to event stream requests
    if (request.headers.accept && request.headers.accept == 'text/event-stream') {
        
        // check if the resource is what we want
        // => http://domain.ext/sse
        if (/sse/gim.test(request.url)) {
            sendSSE(request, response);
        }
    }
    else {
        // if not just return that you are online and a string of text
        response.writeHead(200);
        response.write('Welcome to ' + msg + '@ :' + port);
        response.end();
    }
}).listen(port);

// Setup the SSE "service" :)
function sendSSE(request, response) {
    
    // Setup headers
    // For ease of use: example for enabled CORS
    response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',

        // enabling CORS
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });

    var id = (new Date()).toLocaleTimeString();

    // send first message
    constructSSE(response, id, (new Date()).toLocaleTimeString());
    
    // send message every second and a half
    setInterval(function () {
        constructSSE(response, id, (new Date()).toLocaleTimeString());
    }, 1500);
}

// setup simple message
function constructSSE(response, id, data) {
    response.write('id: ' + id + '\n');
    // response.write('event: ' + 'add' + '\n');
    response.write("data: " + msg + port + '\n\n');
}