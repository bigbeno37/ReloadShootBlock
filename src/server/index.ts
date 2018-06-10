import express from 'express';
import Bases from 'bases';
import WebSocket from 'ws';
import Server from './models/Server';

const app = express();

app.use(express.static(__dirname + '/../../client/'));

app.get('/', (req, res) => res.sendFile('index.html', {"root": __dirname + '/../../client/'}));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

const wsServer = new WebSocket.Server({ port: 8080 });
console.log("WebSocket Server started at port 8080");

// List of Lobby instances
const server = new Server();

wsServer.on('connection', connection => {
    connection.on('message', message => {
        if (message === "create lobby") {
            // Generate a number between 0 and ZZZZ to act as the lobby ID
            let lobbyID = Bases.toBase(Math.floor(Math.random() * 1679616), 36).toUpperCase();

            server.createLobby(lobbyID);

            server.connectPlayerToLobby(connection, lobbyID);

            console.log(`Lobby ID ${lobbyID} created!`);
        }

        console.log(`Received ${message}`);
    });
});