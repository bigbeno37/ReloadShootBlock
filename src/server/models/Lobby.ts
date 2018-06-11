import WebSocket from 'ws';
import GameEngine from "./GameEngine";
import Events from "../enums/Events";
import GameEngineImpl from "../GameEngineImpl";
import Server from "./Server";

export default class Lobby {
    private readonly _id: string;
    private readonly _FIRST_TO: number;
    private readonly _ROUND_DELAY: number;

    private readonly _players: WebSocket[];

    private readonly _game: GameEngine;
    private _server: Server;

    constructor(id: string, server: Server, firstTo: number = 5, roundDelay: number = 5000) {
        this._id = id;
        this._players = [];
        this._game = new GameEngineImpl();
        this._server = server;
        this._ROUND_DELAY = roundDelay;
        this._FIRST_TO = firstTo;
    }

    connectPlayer(connection: WebSocket) {
        this._players.push(connection);

        if (this._players.length === 1) {
            connection.send(JSON.stringify({
                event: 'newlobby',
                lobbyID: this._id
            }));
        } else {
            console.log(`Beginning lobby ${this._id}`);

            this.beginGame();
        }
    }

    private beginGame() {
        // Both players have connected to the lobby
        this.beginRound();

        this._players[0].on('message', (message) => {
            this.choiceHandler(message, this._players[0]);
        });

        this._players[1].on('message', (message) => {
            this.choiceHandler(message, this._players[1]);
        });
    }

    public choiceHandler(message: WebSocket.Data, player: WebSocket) {
        let choice: Events | null = null;

        switch (message) {
            case "shoot":
                choice = Events.SHOOT;
                break;
            case "reload":
                choice = Events.RELOAD;
                break;
            case "block":
                choice = Events.BLOCK;
                break;
        }

        if (choice !== null) {

            if (player === this._players[0]) {
                this._game.getPlayer1().setChoice(choice);
            } else {
                this._game.getPlayer2().setChoice(choice);
            }

            this.checkForAllChoicesMade();
        }
    }

    private checkForAllChoicesMade() {
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
                } else if (this._game.getPlayer2().getPoints() === this._FIRST_TO) {
                    this.endGame('player 2');
                } else {
                    this.beginRound();
                }
            }, this._ROUND_DELAY);
        }
    }

    /**
     * Destroys the current lobby instance through the Server callback
     */
    private endGame(victor: string) {
        this.sendToPlayers('end ' + victor);

        this._server.destroyLobby(this._id);
    }

    /**
     * Sends details of the game's state (i.e. player details such as number of bullets,
     * points, etc.) to each player connected to the lobby
     */
    private beginRound() {
        this.sendToPlayers(JSON.stringify({
            event: 'newround',
            player1: this._game.getPlayer1(),
            player2: this._game.getPlayer2()
        }));
    }

    private sendToPlayers(message: string) {
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
    getPlayers(): WebSocket[] {
        return this._players.slice();
    }

    getGameEngine() {
        return this._game;
    }
}