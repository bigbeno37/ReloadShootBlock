import express from 'express';
import Bases from 'bases';
import WebSocket from 'ws';
import Server from './models/Server';

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../client/');

const wsServer = new WebSocket.Server({ port: 8080 });
console.log("WebSocket Server started at port 8080");
app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.use(express.static(__dirname + '/../client/'));

app.get('/:lobbyID', (req, res) => {
    console.log("hi");
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

            server.createLobby(lobbyID);

            server.connectPlayerToLobby(connection, lobbyID);

            console.log(`Lobby ID ${lobbyID} created!`);
        }

        console.log(`Received ${message}`);
    });
});