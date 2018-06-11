"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bases_1 = __importDefault(require("bases"));
const ws_1 = __importDefault(require("ws"));
const Server_1 = __importDefault(require("./models/Server"));
const app = express_1.default();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../client/');
const wsServer = new ws_1.default.Server({ port: 8080 });
console.log("WebSocket Server started at port 8080");
app.listen(3000, () => console.log('Example app listening on port 3000!'));
app.use(express_1.default.static(__dirname + '/../client/'));
app.get('/:lobbyID', (req, res) => {
    if (req.params.lobbyID === '#') {
        return;
    }
    console.log("Invited player is trying to connect!");
    if (server.findLobbyWithID(req.params.lobbyID)) {
        res.render('index', { connectingTo: req.params.lobbyID });
    }
    else {
        res.send('No lobby found! Maybe your mate\'s an idiot and misspelled four charactres');
    }
});
app.get('/', (req, res) => res.render('index'));
// The actual game engine
const server = new Server_1.default();
wsServer.on('connection', connection => {
    connection.on('message', message => {
        if (message === "create lobby") {
            // Generate a number between 0 and ZZZZ to act as the lobby ID
            let lobbyID = bases_1.default.toBase(Math.floor(Math.random() * 1679616), 36).toUpperCase();
            // Make sure that the lobby ID is padded until reaching 1000
            // (i.e. 1EA should not appear; 01EA is permitted)
            let lobbyIDFormatted = '0000'.substring(lobbyID.length) + lobbyID;
            server.createLobby(lobbyIDFormatted);
            server.connectPlayerToLobby(connection, lobbyIDFormatted);
            console.log(`Lobby ID ${lobbyID} created!`);
            // If the message received contains 'join'...
            // (will be in the format join <lobbyID>)
        }
        else if (message.toString().indexOf('join') !== -1) {
            server.connectPlayerToLobby(connection, message.toString().split(' ')[1]);
        }
        console.log(`Received ${message}`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQiw0Q0FBMkI7QUFDM0IsNkRBQXFDO0FBRXJDLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUM7QUFFNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBQ3JELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDO0FBRTNFLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFFbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDOUIsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUU7UUFDNUIsT0FBTztLQUNWO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBRXBELElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzVDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztLQUMzRDtTQUFNO1FBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO0tBQzFGO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUloRCx5QkFBeUI7QUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7QUFFNUIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLEVBQUU7SUFDbkMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUU7UUFDL0IsSUFBSSxPQUFPLEtBQUssY0FBYyxFQUFFO1lBQzVCLDhEQUE4RDtZQUM5RCxJQUFJLE9BQU8sR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRWxGLDREQUE0RDtZQUM1RCxrREFBa0Q7WUFDbEQsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUM7WUFFbEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXJDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUUxRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksT0FBTyxXQUFXLENBQUMsQ0FBQztZQUVoRCw2Q0FBNkM7WUFDN0MseUNBQXlDO1NBQ3hDO2FBQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2xELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdFO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9