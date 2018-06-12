import Bases from 'bases';
import WebSocket from 'ws';
import Server from './models/Server';

const enableWs = require('express-ws');
const express = require('express');
const app = express();
enableWs(app);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/../../../client/');

app.use(express.static(__dirname + '/../../../client/'));

app.get('/:lobbyID', (req: any, res: any) => {
    if (req.params.lobbyID === '#') {
        return;
    }

    console.log("Invited player is trying to connect!");

    if (server.findLobbyWithID(req.params.lobbyID)) {
        res.render('index', {port: process.env.PORT || 3000, secure: !!process.env.PORT, connectingTo: req.params.lobbyID});
    } else {
        res.send('No lobby found! Maybe your mate\'s an idiot and misspelled four charactres');
    }
});

// The actual game engine
const server = new Server();

app.get('/', (req: any, res: any) => res.render('index', {port: process.env.PORT || 3000, secure: !!process.env.PORT}));

app.ws('/ws', (connection: WebSocket, req: any) => {
    connection.on('message', message => {
        if (message === "create lobby") {
            // Generate a number between 0 and ZZZZ to act as the lobby ID
            let lobbyID = Bases.toBase(Math.floor(Math.random() * 1679616), 36).toUpperCase();

            // Make sure that the lobby ID is padded until reaching 1000
            // (i.e. 1EA should not appear; 01EA is permitted)
            let lobbyIDFormatted = '0000'.substring(lobbyID.length) + lobbyID;

            server.createLobby(lobbyIDFormatted);

            server.connectPlayerToLobby(connection, lobbyIDFormatted);

            console.log(`Lobby ID ${lobbyID} created!`);

            // If the message received contains 'join'...
            // (will be in the format join <lobbyID>)
        } else if (message.toString().indexOf('join') !== -1) {
            server.connectPlayerToLobby(connection, message.toString().split(' ')[1]);
        }

        console.log(`Received ${message}`);
    });
});

app.listen(process.env.PORT || 3000);

console.log(`Server started at port ${process.env.PORT || 3000}`);