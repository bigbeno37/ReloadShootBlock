import Player from "./Player";
import IGameRules from "../interfaces/IGameRules";
import RoundResult from "../../shared/events/RoundResult";
import Events from "../enums/Events";
import InvalidChoiceError from "../errors/InvalidChoiceError";
import RoundResultImpl from "../RoundResultImpl";
import IGameEngine from "../interfaces/IGameEngine";

/**
 * Contains the implementation of [[GameEngine]] and is used to process rounds in [[Lobby]]
 */
export default class GameEngine implements IGameEngine {
    private readonly _player1: Player;
    private readonly _player2: Player;
    private readonly _gameRules: IGameRules;

    constructor(gameRules: IGameRules) {
        this._gameRules = gameRules;

        this._player1 = gameRules.createPlayer();
        this._player2 = gameRules.createPlayer();
    }

    getPlayer1(): Player {
        return this._player1;
    }

    getPlayer2(): Player {
        return this._player2;
    }

    /**
     * After validating both player's choices and resetting the stunned state of both players, designate [[applyChoice]]
     * to handle removal and adding of fields depending on choices made. Afterwards clear both player's choices and return
     * the [[RoundResult]]
     * @return {RoundResult}
     */
    processRound(): RoundResult {
        this.validateChoice(this._player1);
        this.validateChoice(this._player2);

        this._player1.setStunned(false);
        this._player2.setStunned(false);

        this.applyChoice(this._player1, <Events>this._player2.getChoice());
        this.applyChoice(this._player2, <Events>this._player1.getChoice());

        let roundResult = new RoundResultImpl(<Events>this._player1.getChoice(), <Events>this._player2.getChoice());

        this.clearPlayerChoices();

        return roundResult;
    }

    /**
     * Apply the given choice of a player based on the opponent's choice. More details can be found in [[StandardRules]]
     * @param player
     * @param opponentsChoice
     */
    private applyChoice(player: Player, opponentsChoice: Events) {
        switch (player.getChoice()) {
            case Events.RELOAD:
                this._gameRules.onReload(player, opponentsChoice);

                break;
            case Events.SHOOT:
                this._gameRules.onShoot(player, opponentsChoice);

                break;
            case Events.BLOCK:
                this._gameRules.onBlock(player, opponentsChoice);

                break;
        }
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

    private clearPlayerChoices() {
        this._player1.setChoice(null);
        this._player2.setChoice(null)
    }
}