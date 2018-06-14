"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./models/Player"));
const Events_1 = __importDefault(require("./enums/Events"));
const RoundResultImpl_1 = __importDefault(require("./RoundResultImpl"));
const InvalidChoiceError_1 = __importDefault(require("./errors/InvalidChoiceError"));
/**
 * Contains the implementation of [[GameEngine]] and is used to process rounds in [[Lobby]]
 */
class GameEngineImpl {
    constructor() {
        this._player1 = new Player_1.default();
        this._player2 = new Player_1.default();
    }
    getPlayer1() {
        return this._player1;
    }
    getPlayer2() {
        return this._player2;
    }
    /**
     * Calls the respective handler based on what [[_player1]]'s choice was and returns a [[RoundResultImpl]] instance
     * after clearing both player's choices through [[clearPlayerChoices]]
     * @return {RoundResult}
     */
    processRound() {
        this.validateChoice(this._player1);
        this.validateChoice(this._player2);
        this._player1.setStunned(false);
        this._player2.setStunned(false);
        switch (this._player1.getChoice()) {
            case Events_1.default.SHOOT:
                this.shootHandler();
                break;
            case Events_1.default.RELOAD:
                this.reloadHandler();
                break;
            case Events_1.default.BLOCK:
                this.blockHandler();
                break;
        }
        let roundResult = new RoundResultImpl_1.default(this._player1.getChoice(), this._player2.getChoice());
        this.clearPlayerChoices();
        return roundResult;
    }
    /**
     * Validate the choice a player has selected before processing the round. If a move is found to be invalid,
     * this will throw [[InvalidChoiceError]]
     * @param player The player whose choice is to be validated
     */
    validateChoice(player) {
        switch (player.getChoice()) {
            case null:
                throw new InvalidChoiceError_1.default('Choice cannot be null!');
            case Events_1.default.RELOAD:
                if (player.getBullets() >= player.getMaxBullets()) {
                    this.clearPlayerChoices();
                    throw new InvalidChoiceError_1.default(`Cannot reload beyond ${player.getMaxBullets()}`);
                }
                break;
            case Events_1.default.SHOOT:
                if (!player.canShoot()) {
                    this.clearPlayerChoices();
                    throw new InvalidChoiceError_1.default('Player cannot shoot this round!');
                }
                break;
            case Events_1.default.BLOCK:
                if (!player.canBlock()) {
                    this.clearPlayerChoices();
                    throw new InvalidChoiceError_1.default('Player cannot block this round!');
                }
                break;
        }
    }
    /**
     * Given player 1 reloaded, perform a set of actions based on the choice player 2 made. Will always
     * add a bullet and set the unsuccessful blocks of [[_player2]] to 0
     */
    reloadHandler() {
        // Player 1 reloaded, add bullet to player 1 and:
        // If player 2 shot, add point to player 2
        // If player 2 reloaded, add bullet to player 2
        // If player 2 blocked, increment unsuccessfulBlocks on player 2
        this._player1.addBullet();
        this._player1.setUnsuccessfulBlocks(0);
        switch (this._player2.getChoice()) {
            case Events_1.default.RELOAD:
                this._player2.addBullet();
                this._player2.setUnsuccessfulBlocks(0);
                break;
            case Events_1.default.SHOOT:
                this._player2.removeBullet();
                this._player2.addPoint();
                this._player2.setUnsuccessfulBlocks(0);
                break;
            case Events_1.default.BLOCK:
                this._player2.addUnsuccessfulBlock();
                break;
        }
    }
    /**
     * Given player 1 shot, perform a set of actions based on the choice player 2 made. Will always remove a bullet
     * from [_player1] and set the unsuccessful blocks of both [_player1] and [_player2] to 0
     */
    shootHandler() {
        // Player 1 shot; remove bullet from player 1 and:
        // If player 2 shot, remove bullet from player 2
        // If player 2 reloaded, add point to player 1 and add bullet to player 2
        // If player 2 blocked, reset unsuccessful blocks on player 2
        this._player1.removeBullet();
        this._player1.setUnsuccessfulBlocks(0);
        this._player2.setUnsuccessfulBlocks(0);
        switch (this._player2.getChoice()) {
            case Events_1.default.RELOAD:
                this._player1.addPoint();
                this._player2.addBullet();
                break;
            case Events_1.default.SHOOT:
                this._player2.removeBullet();
                break;
            case Events_1.default.BLOCK:
                this._player1.setStunned(true);
                break;
        }
    }
    /**
     * Given player 1 blocked, perform a set of actions based on the choice player 2 made.
     */
    blockHandler() {
        // Player 1 blocked, and:
        // If player 2 shot, reset unsuccessfulBlocks on player 1
        // If player 2 reloaded, add bullet to player 2 and increment unsuccessfulBlocks on player 1
        // If player 2 blocked, increment unsuccessfulBlocks on both players
        switch (this._player2.getChoice()) {
            case Events_1.default.RELOAD:
                this._player1.addUnsuccessfulBlock();
                this._player2.addBullet();
                this._player2.setUnsuccessfulBlocks(0);
                break;
            case Events_1.default.SHOOT:
                this._player1.setUnsuccessfulBlocks(0);
                this._player2.setUnsuccessfulBlocks(0);
                this._player2.removeBullet();
                this._player2.setStunned(true);
                break;
            case Events_1.default.BLOCK:
                this._player1.addUnsuccessfulBlock();
                this._player2.addUnsuccessfulBlock();
                break;
        }
    }
    clearPlayerChoices() {
        this._player1.setChoice(null);
        this._player2.setChoice(null);
    }
}
exports.default = GameEngineImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUVuZ2luZUltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmVyL0dhbWVFbmdpbmVJbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXFDO0FBQ3JDLDREQUFvQztBQUdwQyx3RUFBZ0Q7QUFDaEQscUZBQTZEO0FBRTdEOztHQUVHO0FBQ0g7SUFJSTtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVk7UUFDUixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDL0IsS0FBSyxnQkFBTSxDQUFDLEtBQUs7Z0JBQ2IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUVwQixNQUFNO1lBQ1YsS0FBSyxnQkFBTSxDQUFDLE1BQU07Z0JBQ2QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUVyQixNQUFNO1lBQ1YsS0FBSyxnQkFBTSxDQUFDLEtBQUs7Z0JBQ2IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUVwQixNQUFNO1NBQ2I7UUFF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