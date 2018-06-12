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
app.set('views', __dirname + '/../../../client/');
const wsServer = new ws_1.default.Server({ port: 8080 });
console.log("WebSocket Server started at port 8080");
app.listen(process.env.PORT || 3000, () => console.log(`App listening for HTTP requests at port ${process.env.port || 3000}`));
app.use(express_1.default.static(__dirname + '/../../../client/'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQiw0Q0FBMkI7QUFDM0IsNkRBQXFDO0FBRXJDLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztBQUVsRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFlBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7QUFDckQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRS9ILEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQztBQUV6RCxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM5QixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBRTtRQUM1QixPQUFPO0tBQ1Y7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFFcEQsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDNUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0tBQzNEO1NBQU07UUFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLDRFQUE0RSxDQUFDLENBQUM7S0FDMUY7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBSWhELHlCQUF5QjtBQUN6QixNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztBQUU1QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsRUFBRTtJQUNuQyxVQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRTtRQUMvQixJQUFJLE9BQU8sS0FBSyxjQUFjLEVBQUU7WUFDNUIsOERBQThEO1lBQzlELElBQUksT0FBTyxHQUFHLGVBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFbEYsNERBQTREO1lBQzVELGtEQUFrRDtZQUNsRCxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUVsRSxNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFckMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTFELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxPQUFPLFdBQVcsQ0FBQyxDQUFDO1lBRWhELDZDQUE2QztZQUM3Qyx5Q0FBeUM7U0FDeEM7YUFBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbEQsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0U7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=