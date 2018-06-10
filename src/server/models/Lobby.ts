import WebSocket from 'ws';
import GameEngine from "./GameEngine";
import Events from "../enums/Events";
import Player from "./Player";
import GameEngineImpl from "../GameEngineImpl";
import Server from "./Server";

export default class Lobby {
    private readonly _id: string;
    private readonly _FIRST_TO = 5;

    private readonly _players: WebSocket[];

    private _game: GameEngine;
    private _server: Server;

    constructor(id: string, server: Server) {
        this._id = id;
        this._players = [];
        this._game = new GameEngineImpl();
        this._server = server;
    }

    connectPlayer(connection: WebSocket) {
        // If no player has been designated to player 1, the connecting player must be player 1
        if (this._players.length === 0) {
            this._players.push(connection);

            connection.send(`lobby 1 ${this._id}`);
        } else {
            this._players.push(connection);

            connection.send('lobby 2');

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

    private choiceHandler(message: WebSocket.Data, player: WebSocket) {
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
            // let result = this._game.processRound();

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
                } else if (this._game.getPlayer2().getPoints() === this._FIRST_TO) {
                    this.endGame('player 2');
                } else {
                    this.beginRound();
                }
            }, 5000);
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
        this.sendToPlayers(
               '1 ' + this._players[0].toString()
            + ' 2 ' + this._players[1].toString()
        );
    }

    private sendToPlayers(message: string) {
        this._players[0].send(message);
        this._players[1].send(message);
    }

    getID() {
        return this._id;
    }
}