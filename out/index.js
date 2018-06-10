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
    console.log("hi");
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
            server.createLobby(lobbyID);
            server.connectPlayerToLobby(connection, lobbyID);
            console.log(`Lobby ID ${lobbyID} created!`);
        }
        console.log(`Received ${message}`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQiw0Q0FBMkI7QUFDM0IsNkRBQXFDO0FBRXJDLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUM7QUFFNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBQ3JELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDO0FBRTNFLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFFbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM1QyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7S0FDM0Q7U0FBTTtRQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsNEVBQTRFLENBQUMsQ0FBQztLQUMxRjtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFJaEQseUJBQXlCO0FBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0FBRTVCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0lBQ25DLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1FBQy9CLElBQUksT0FBTyxLQUFLLGNBQWMsRUFBRTtZQUM1Qiw4REFBOEQ7WUFDOUQsSUFBSSxPQUFPLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVsRixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTVCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLE9BQU8sV0FBVyxDQUFDLENBQUM7U0FDL0M7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=