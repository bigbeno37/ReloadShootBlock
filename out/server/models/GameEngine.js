"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = __importDefault(require("../enums/Events"));
const InvalidChoiceError_1 = __importDefault(require("../errors/InvalidChoiceError"));
const RoundResultImpl_1 = __importDefault(require("../RoundResultImpl"));
/**
 * Contains the implementation of [[GameEngine]] and is used to process rounds in [[Lobby]]
 */
class GameEngine {
    constructor(gameRules) {
        this._gameRules = gameRules;
        this._player1 = gameRules.createPlayer();
        this._player2 = gameRules.createPlayer();
    }
    getPlayer1() {
        return this._player1;
    }
    getPlayer2() {
        return this._player2;
    }
    /**
     * After validating both player's choices and resetting the stunned state of both players, designate [[applyChoice]]
     * to handle removal and adding of fields depending on choices made. Afterwards clear both player's choices and return
     * the [[RoundResult]]
     * @return {RoundResult}
     */
    processRound() {
        this.validateChoice(this._player1);
        this.validateChoice(this._player2);
        this._player1.setStunned(false);
        this._player2.setStunned(false);
        this.applyChoice(this._player1, this._player2.getChoice());
        this.applyChoice(this._player2, this._player1.getChoice());
        let roundResult = new RoundResultImpl_1.default(this._player1.getChoice(), this._player2.getChoice());
        this.clearPlayerChoices();
        return roundResult;
    }
    /**
     * Apply the given choice of a player based on the opponent's choice. More details can be found in [[StandardRules]]
     * @param player
     * @param opponentsChoice
     */
    applyChoice(player, opponentsChoice) {
        switch (player.getChoice()) {
            case Events_1.default.RELOAD:
                this._gameRules.onReload(player, opponentsChoice);
                break;
            case Events_1.default.SHOOT:
                this._gameRules.onShoot(player, opponentsChoice);
                break;
            case Events_1.default.BLOCK:
                this._gameRules.onBlock(player, opponentsChoice);
                break;
        }
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
    clearPlayerChoices() {
        this._player1.setChoice(null);
        this._player2.setChoice(null);
    }
}
exports.default = GameEngine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZUVuZ2luZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL0dhbWVFbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSw2REFBcUM7QUFDckMsc0ZBQThEO0FBQzlELHlFQUFpRDtBQUdqRDs7R0FFRztBQUNIO0lBS0ksWUFBWSxTQUFxQjtRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUU1QixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxZQUFZO1FBQ1IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRW5FLElBQUksV0FBVyxHQUFHLElBQUkseUJBQWUsQ0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUU1RyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLFdBQVcsQ0FBQyxNQUFjLEVBQUUsZUFBdUI7UUFDdkQsUUFBUSxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDeEIsS0FBSyxnQkFBTSxDQUFDLE1BQU07Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUVsRCxNQUFNO1lBQ1YsS0FBSyxnQkFBTSxDQUFDLEtBQUs7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUVqRCxNQUFNO1lBQ1YsS0FBSyxnQkFBTSxDQUFDLEtBQUs7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUVqRCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGNBQWMsQ0FBQyxNQUFjO1FBQ2pDLFFBQU8sTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3ZCLEtBQUssSUFBSTtnQkFDTCxNQUFNLElBQUksNEJBQWtCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUMzRCxLQUFLLGdCQUFNLENBQUMsTUFBTTtnQkFDZCxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUU7b0JBQy9DLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUUxQixNQUFNLElBQUksNEJBQWtCLENBQUMsd0JBQXdCLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ2xGO2dCQUVELE1BQU07WUFDVixLQUFLLGdCQUFNLENBQUMsS0FBSztnQkFDYixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUNwQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFFMUIsTUFBTSxJQUFJLDRCQUFrQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7aUJBQ25FO2dCQUVELE1BQU07WUFDVixLQUFLLGdCQUFNLENBQUMsS0FBSztnQkFDYixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUNwQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFFMUIsTUFBTSxJQUFJLDRCQUFrQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7aUJBQ25FO2dCQUVELE1BQU07U0FDYjtJQUNMLENBQUM7SUFFTyxrQkFBa0I7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDakMsQ0FBQztDQUNKO0FBekdELDZCQXlHQyJ9