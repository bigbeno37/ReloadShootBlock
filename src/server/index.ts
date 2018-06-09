const express = require('express');
const app = express();
const Bases = require('bases');
const Server = require('./models/Server');

app.use(express.static(__dirname + '/../client/'));

app.get('/', (req, res) => res.sendFile('index.html', {"root": __dirname + '/../client/'}));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// Web Socket stuff
const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: 8080 });
console.log("WebSocket Server started at port 8080");

// List of Lobby instances
const server = new Server();

wsServer.on('connection', (connection) => {
    connection.on('message', (message) => {
        if (message === "create lobby") {
            // Generate a number between 0 and ZZZZ to act as the lobby ID
            let lobbyID = (Bases.toBase36(
                            Math.floor(Math.random() * 1679616)
                          )).toString().toUpperCase();

            server.createLobby(lobbyID);

            server.connectPlayerToLobby(connection, lobbyID);

            console.log(`Lobby ID ${lobbyID} created!`);
        }

        console.log(`Received ${message}`);
    });
});