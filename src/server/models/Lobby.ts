import WebSocket from 'ws';
import GameEngine from "./GameEngine";
import Events from "./Events";
import Player from "./Player";

enum State {
    WAITING_FOR_PLAYERS,
    WAITING_FOR_CHOICES,
    GAME_FINISHED
}

export default class Lobby {
    public static readonly State = State;
    private _lobbyStatus: State;

    private readonly _id: string;

    private _player1: WebSocket;
    private _player2: WebSocket;

    private _game: GameEngine;

    constructor(id: string) {
        this._id = id;
        this._lobbyStatus = State.WAITING_FOR_PLAYERS;
        this._game = new GameEngine();
    }

    connectPlayer(connection: WebSocket) {
        // If no player has been designated to player 1, the connecting player must be player 1
        if (this._player1 == null) {
            this._player1 = connection;

            connection.send(`lobby 1 ${this._id}`);
        } else {
            this._player2 = connection;

            connection.send('lobby 2');

            this.beginGame();
        }
    }

    private beginGame() {
        // Both players have connected to the lobby
        this._lobbyStatus = State.WAITING_FOR_CHOICES;

        this.beginRound();

        this._player1.on('message', (message) => {
            this.choiceHandler(message, this._player1);
        });

        this._player2.on('message', (message) => {
            this.choiceHandler(message, this._player2);
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

            if (player === this._player1) {
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
            let winner: Player | null = this._game.processRound(
                this._game.getPlayer1().getChoice(),
                this._game.getPlayer2().getChoice()
            );

            if (winner === null) {
                this.sendToPlayers('draw');
            } else if (winner === this._game.getPlayer1()) {
                this.sendToPlayers('player 1 wins');
            } else if (winner === this._game.getPlayer2()) {
                this.sendToPlayers('player 2 wins');
            }

            setTimeout(() => {
                this.beginRound();
            }, 5000);
        }
    }

    private beginRound() {
        this._player1.send('start ' +
            + this._game.getPlayer1().getPoints() + ' '
            + this._game.getPlayer1().getBullets() + ' '
            + this._game.getPlayer2().getPoints()
        );

        this._player1.send('start ' +
            + this._game.getPlayer2().getPoints() + ' '
            + this._game.getPlayer2().getBullets() + ' '
            + this._game.getPlayer1().getPoints()
        );
    }

    private sendToPlayers(message: string) {
        this._player1.send(message);
        this._player2.send(message);
    }

    getID() {
        return this._id;
    }
}