import Player from "./models/Player";
import Events from './enums/Events';
import GameEngine from './models/GameEngine';
import RoundResult from "../shared/events/RoundResult";
import RoundResultImpl from "./RoundResultImpl";

export default class GameEngineImpl implements GameEngine {
    private readonly _player1: Player;
    private readonly _player2: Player;

    constructor() {
        this._player1 = new Player();
        this._player2 = new Player();
    }

    getPlayer1(): Player {
        return this._player1;
    }

    getPlayer2(): Player {
        return this._player2;
    }

    processRound(): RoundResult {
        switch (this._player1.getChoice()) {
            case Events.SHOOT:
                this.shootHandler();

                break;
            case Events.RELOAD:
                this.reloadHandler();

                break;
            case Events.BLOCK:
                this.blockHandler();

                break;
        }

        let roundResult = new RoundResultImpl(<Events>this._player1.getChoice(), <Events>this._player2.getChoice());

        this.clearPlayerChoices();

        return roundResult;
    }

    private reloadHandler() {
        // Player 1 reloaded, add bullet to player 1 and:
        // If player 2 shot, add point to player 2
        // If player 2 reloaded, add bullet to player 2
        // If player 2 blocked, increment unsuccessfulBlocks on player 2

        this._player1.addBullet();
        this._player1.setUnsuccessfulBlocks(0);

        switch (this._player2.getChoice()) {
            case Events.RELOAD:
            case Events.SHOOT:
                this._player2.addBullet();
                this._player2.setUnsuccessfulBlocks(0);

                break;
            case Events.BLOCK:
                this._player2.addUnsuccessfulBlock();

                break;
        }
    }

    private shootHandler() {
        // Player 1 shot; remove bullet from player 1 and:
        // If player 2 shot, remove bullet from player 2
        // If player 2 reloaded, add point to player 1 and add bullet to player 2
        // If player 2 blocked, reset unsuccessful blocks on player 2

        this._player1.removeBullet();
        this._player1.setUnsuccessfulBlocks(0);
        this._player2.setUnsuccessfulBlocks(0);

        switch (this._player2.getChoice()) {
            case Events.RELOAD:
                this._player1.addPoint();
                this._player2.addBullet();

                break;
            case Events.SHOOT:
                this._player2.removeBullet();

                break;
        }
    }

    private blockHandler() {
        // Player 1 blocked, and:
        // If player 2 shot, reset unsuccessfulBlocks on player 1
        // If player 2 reloaded, add bullet to player 2 and increment unsuccessfulBlocks on player 1
        // If player 2 blocked, increment unsuccessfulBlocks on both players

        switch(this._player2.getChoice()) {
            case Events.RELOAD:
                this._player1.addUnsuccessfulBlock();
                this._player2.addBullet();
                this._player2.setUnsuccessfulBlocks(0);

                break;
            case Events.SHOOT:
                this._player1.setUnsuccessfulBlocks(0);
                this._player2.setUnsuccessfulBlocks(0);

                break;
            case Events.BLOCK:
                this._player1.addUnsuccessfulBlock();
                this._player2.addUnsuccessfulBlock();

                break;
        }
    }

    private clearPlayerChoices() {
        this._player1.setChoice(null);
        this._player2.setChoice(null)
    }
}