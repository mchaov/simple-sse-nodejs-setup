const port = 5000;
const msg = " - Simple SSE server - ";

const http = require('http');
const sys = require('util');
const fs = require('fs');

http.createServer(function (request, response) {
    if (request.headers.accept && request.headers.accept == 'text/event-stream') {
        if (/sse/gim.test(request.url)) {
            sendSSE(request, response);
        }
    }
    else {
        response.writeHead(200);
        response.write('Welcome to ' + msg + '@ :' + port);
        response.end();
    }
}).listen(port);

function sendSSE(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    var id = (new Date()).toLocaleTimeString();

    setInterval(function () {
        constructSSE(response, id, (new Date()).toLocaleTimeString());
    }, 1500);

    constructSSE(response, id, (new Date()).toLocaleTimeString());
}

function constructSSE(response, id, data) {
    response.write('id: ' + id + '\n');
    response.write("data: " + msg + port + '\n\n');
}