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
        // If no player has been designated to player 1, the connecting player must be player 1
        if (this._players.length === 0) {
            this._players.push(connection);
            connection.send(`lobby 1 ${this._id}`);
        }
        else {
            this._players.push(connection);
            connection.send('lobby 2');
            this.beginGame();
        }
    }
    beginGame() {
        // Both players have connected to the lobby
        this.beginRound();
        this._players[0].on('message', (message) => {
            this.choiceHandler(message, this._players[0]);
        });
        this._players[1].on('message', (message) => {
            this.choiceHandler(message, this._players[1]);
        });
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
            this.sendToPlayers(this._game.processRound().toString());
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
    /**
     * Sends details of the game's state (i.e. player details such as number of bullets,
     * points, etc.) to each player connected to the lobby
     */
    beginRound() {
        this.sendToPlayers('1 ' + this._game.getPlayer1().toString()
            + ' 2 ' + this._game.getPlayer2().toString());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmVyL21vZGVscy9Mb2JieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDZEQUFxQztBQUNyQyx1RUFBK0M7QUFHL0M7SUFVSSxZQUFZLEVBQVUsRUFBRSxNQUFjLEVBQUUsVUFBa0IsQ0FBQyxFQUFFLGFBQXFCLElBQUk7UUFDbEYsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksd0JBQWMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBcUI7UUFDL0IsdUZBQXVGO1FBQ3ZGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRS9CLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFL0IsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRU8sU0FBUztRQUNiLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FB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Q0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Y0FDMUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQy9DLENBQUM7SUFDTixDQUFDO0lBRU8sYUFBYSxDQUFDLE9BQWU7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUs7UUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBMUlELHdCQTBJQyJ9