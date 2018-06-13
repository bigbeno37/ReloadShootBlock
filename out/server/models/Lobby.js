"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = __importDefault(require("../enums/Events"));
const GameEngineImpl_1 = __importDefault(require("../GameEngineImpl"));
class Lobby {
    constructor(id, server, firstTo = 5, roundDelay = 5000) {
        this._id = id;
        this._players = [];
        this._game = new GameEngineImpl_1.default();
        this._server = server;
        this._ROUND_DELAY = roundDelay;
        this._FIRST_TO = firstTo;
    }
    connectPlayer(connection) {
        this._players.push(connection);
        if (this._players.length === 1) {
            let event = {
                event: 'new lobby',
                lobbyID: this._id
            };
            connection.send(JSON.stringify(event));
        }
        else {
            console.log(`Beginning lobby ${this._id}`);
            this.beginGame();
        }
    }
    beginGame() {
        // Both players have connected to the lobby
        let event = {
            event: 'begin game',
            player1: this._game.getPlayer1().toJSON(),
            player2: this._game.getPlayer2().toJSON()
        };
        this.sendToPlayers(JSON.stringify(event));
        this._players[0].on('message', (message) => {
            this.choiceHandler(message, this._players[0]);
        });
        this._players[1].on('message', (message) => {
            this.choiceHandler(message, this._players[1]);
        });
    }
    /**
     * Sends details of the game's state (i.e. player details such as number of bullets,
     * points, etc.) to each player connected to the lobby
     */
    beginRound() {
        let event = {
            event: 'new round',
        };
        this.sendToPlayers(JSON.stringify(event));
    }
    choiceHandler(message, player) {
        let choice = null;
        switch (message) {
            case "shoot":
                choice = Events_1.default.SHOOT;
                break;
            case "reload":
                choice = Events_1.default.RELOAD;
                break;
            case "block":
                choice = Events_1.default.BLOCK;
                break;
        }
        if (choice !== null) {
            if (player === this._players[0]) {
                this._game.getPlayer1().setChoice(choice);
            }
            else {
                this._game.getPlayer2().setChoice(choice);
            }
            this.checkForAllChoicesMade();
        }
    }
    checkForAllChoicesMade() {
        // If both players have made their choice, process the results
        if (this._game.getPlayer1().getChoice() && this._game.getPlayer2().getChoice()) {
            // Informs players of the result of the round in the format
            // <RoundState> <Player 1 Event> <Player 2 Event>
            // i.e. draw shoot block
            let event = {
                event: 'round over',
                results: this._game.processRound(),
                player1: this._game.getPlayer1().toJSON(),
                player2: this._game.getPlayer2().toJSON()
            };
            this.sendToPlayers(JSON.stringify(event));
            // Wait five seconds until the next round starts
            // (allows players time to read what happened in the round)
            setTimeout(() => {
                // If a player has reached the point limit, the game is over and thus the lobby
                // should be destroyed
                if (this._game.getPlayer1().getPoints() === this._FIRST_TO) {
                    this.endGame('player 1');
                }
                else if (this._game.getPlayer2().getPoints() === this._FIRST_TO) {
                    this.endGame('player 2');
                }
                else {
                    this.beginRound();
                }
            }, this._ROUND_DELAY);
        }
    }
    /**
     * Destroys the current lobby instance through the Server callback
     */
    endGame(victor) {
        this.sendToPlayers('end ' + victor);
        this._server.destroyLobby(this._id);
    }
    sendToPlayers(message) {
        this._players[0].send(message);
        this._players[1].send(message);
    }
    getID() {
        return this._id;
    }
    /**
     * Return a duplicate list of players in this lobby instance
     * @returns {WebSocket[]}
     */
    getPlayers() {
        return this._players.slice();
    }
    getGameEngine() {
        return this._game;
    }
}
exports.default = Lobby;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL21vZGVscy9Mb2JieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDZEQUFxQztBQUNyQyx1RUFBK0M7QUFPL0M7SUFVSSxZQUFZLEVBQVUsRUFBRSxNQUFjLEVBQUUsVUFBa0IsQ0FBQyxFQUFFLGFBQXFCLElBQUk7UUFDbEYsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksd0JBQWMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBcUI7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxLQUFLLEdBQWtCO2dCQUN2QixLQUFLLEVBQUUsV0FBVztnQkFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHO2FBQ3BCLENBQUM7WUFFRixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVPLFNBQVM7UUFDYiwyQ0FBMkM7UUFDM0MsSUFBSSxLQUFLLEdBQW1CO1lBQ3hCLEtBQUss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