"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./models/Player"));
const Events_1 = __importDefault(require("./enums/Events"));
const RoundResultImpl_1 = __importDefault(require("./RoundResultImpl"));
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
    processRound() {
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
        }
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUVuZ2luZUltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL0dhbWVFbmdpbmVJbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkRBQXFDO0FBQ3JDLDREQUFvQztBQUdwQyx3RUFBZ0Q7QUFFaEQ7SUFJSTtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsWUFBWTtRQUNSLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMvQixLQUFLLGdCQUFNLENBQUMsS0FBSztnQkFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBRXBCLE1BQU07WUFDVixLQUFLLGdCQUFNLENBQUMsTUFBTTtnQkFDZCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRXJCLE1BQU07WUFDVixLQUFLLGdCQUFNLENBQUMsS0FBSztnQkFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBRXBCLE1BQU07U0FDYjtRQUVELElBQUksV0FBVyxHQUFHLElBQUkseUJBQWUsQ0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUU1RyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRU8sYUFBYTtRQUNqQixpREFBaUQ7UUFDakQsMENBQTBDO1FBQzFDLCtDQUErQztRQUMvQyxnRUFBZ0U7UUFF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