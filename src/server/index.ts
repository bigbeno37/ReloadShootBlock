import express from 'express';
import Bases from 'bases';
import WebSocket from 'ws';
import Server from './models/Server';

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../../../client/');

const wsServer = new WebSocket.Server({ port: 8080 });
console.log("WebSocket Server started at port 8080");
app.listen(process.env.PORT || 3000, () => console.log(`App listening for HTTP requests at port ${process.env.port || 3000}`));

app.use(express.static(__dirname + '/../../../client/'));

app.get('/:lobbyID', (req, res) => {
    if (req.params.lobbyID === '#') {
        return;
    }

    console.log("Invited player is trying to connect!");

    if (server.findLobbyWithID(req.params.lobbyID)) {
        res.render('index', {connectingTo: req.params.lobbyID});
    } else {
        res.send('No lobby found! Maybe your mate\'s an idiot and misspelled four charactres');
    }
});

app.get('/', (req, res) => res.render('index'));



// The actual game engine
const server = new Server();

wsServer.on('connection', connection => {
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