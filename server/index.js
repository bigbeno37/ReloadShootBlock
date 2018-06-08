const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/'));

app.get('/', (req, res) => res.sendFile('index.html', {"root": __dirname + '/../client/'}));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// Web Socket stuff
const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: 8080 });
console.log("WebSocket Server started at port 8080");

wsServer.on('connection', (connection) => {
    connection.on('message', (message) => {
        console.log(`Received: ${message}`);
    });

    connection.send('something');
});