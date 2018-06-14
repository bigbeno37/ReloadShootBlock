import Player from "./models/Player";
import Events from './enums/Events';
import GameEngine from './models/GameEngine';
import RoundResult from "../shared/events/RoundResult";
import RoundResultImpl from "./RoundResultImpl";
import InvalidChoiceError from "./errors/InvalidChoiceError";

/**
 * Contains the implementation of [[GameEngine]] and is used to process rounds in [[Lobby]]
 */
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

    /**
     * Calls the respective handler based on what [[_player1]]'s choice was and returns a [[RoundResultImpl]] instance
     * after clearing both player's choices through [[clearPlayerChoices]]
     * @return {RoundResult}
     */
    processRound(): RoundResult {
        this.validateChoice(this._player1);
        this.validateChoice(this._player2);

        this._player1.setStunned(false);
        this._player2.setStunned(false);

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

    /**
     * Validate the choice a player has selected before processing the round. If a move is found to be invalid,
     * this will throw [[InvalidChoiceError]]
     * @param player The player whose choice is to be validated
     */
    private validateChoice(player: Player) {
        switch(player.getChoice()) {
            case null:
                throw new InvalidChoiceError('Choice cannot be null!');
            case Events.RELOAD:
                if (player.getBullets() >= player.getMaxBullets()) {
                    this.clearPlayerChoices();

                    throw new InvalidChoiceError(`Cannot reload beyond ${player.getMaxBullets()}`);
                }

                break;
            case Events.SHOOT:
                if (!player.canShoot()) {
                    this.clearPlayerChoices();

                    throw new InvalidChoiceError('Player cannot shoot this round!');
                }

                break;
            case Events.BLOCK:
                if (!player.canBlock()) {
                    this.clearPlayerChoices();

                    throw new InvalidChoiceError('Player cannot block this round!');
                }

                break;
        }
    }

    /**
     * Given player 1 reloaded, perform a set of actions based on the choice player 2 made. Will always
     * add a bullet and set the unsuccessful blocks of [[_player2]] to 0
     */
    private reloadHandler() {
        // Player 1 reloaded, add bullet to player 1 and:
        // If player 2 shot, add point to player 2
        // If player 2 reloaded, add bullet to player 2
        // If player 2 blocked, increment unsuccessfulBlocks on player 2

        this._player1.addBullet();
        this._player1.setUnsuccessfulBlocks(0);

        switch (this._player2.getChoice()) {
            case Events.RELOAD:
                this._player2.addBullet();
                this._player2.setUnsuccessfulBlocks(0);

                break;
            case Events.SHOOT:
                this._player2.removeBullet();
                this._player2.addPoint();
                this._player2.setUnsuccessfulBlocks(0);

                break;
            case Events.BLOCK:
                this._player2.addUnsuccessfulBlock();

                break;
        }
    }

    /**
     * Given player 1 shot, perform a set of actions based on the choice player 2 made. Will always remove a bullet
     * from [_player1] and set the unsuccessful blocks of both [_player1] and [_player2] to 0
     */
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
            case Events.BLOCK:
                this._player1.setStunned(true);

                break;
        }
    }

    /**
     * Given player 1 blocked, perform a set of actions based on the choice player 2 made.
     */
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
                this._player2.removeBullet();
                this._player2.setStunned(true);

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