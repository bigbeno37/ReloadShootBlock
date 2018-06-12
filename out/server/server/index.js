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
app.listen(3000, () => console.log('Example app listening on port 3000!'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQiw0Q0FBMkI7QUFDM0IsNkRBQXFDO0FBRXJDLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztBQUVsRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFlBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7QUFDckQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLENBQUM7QUFFM0UsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0FBRXpELEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQzlCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO1FBQzVCLE9BQU87S0FDVjtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUVwRCxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM1QyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7S0FDM0Q7U0FBTTtRQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsNEVBQTRFLENBQUMsQ0FBQztLQUMxRjtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFJaEQseUJBQXlCO0FBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0FBRTVCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0lBQ25DLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1FBQy9CLElBQUksT0FBTyxLQUFLLGNBQWMsRUFBRTtZQUM1Qiw4REFBOEQ7WUFDOUQsSUFBSSxPQUFPLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVsRiw0REFBNEQ7WUFDNUQsa0RBQWtEO1lBQ2xELElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBRWxFLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVyQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFFMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLE9BQU8sV0FBVyxDQUFDLENBQUM7WUFFaEQsNkNBQTZDO1lBQzdDLHlDQUF5QztTQUN4QzthQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNsRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RTtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==