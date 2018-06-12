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
            connection.send(JSON.stringify({
                event: 'newlobby',
                lobbyID: this._id
            }));
        }
        else {
            console.log(`Beginning lobby ${this._id}`);
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
            this.sendToPlayers(JSON.stringify({
                event: 'roundover',
                result: this._game.processRound()
            }));
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
        this.sendToPlayers(JSON.stringify({
            event: 'newround',
            player1: this._game.getPlayer1(),
            player2: this._game.getPlayer2()
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL21vZGVscy9Mb2JieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDZEQUFxQztBQUNyQyx1RUFBK0M7QUFHL0M7SUFVSSxZQUFZLEVBQVUsRUFBRSxNQUFjLEVBQUUsVUFBa0IsQ0FBQyxFQUFFLGFBQXFCLElBQUk7UUFDbEYsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksd0JBQWMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBcUI7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUMzQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHO2FBQ3BCLENBQUMsQ0FBQyxDQUFDO1NBQ1A7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFTyxTQUFTO1FBQ2IsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FB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