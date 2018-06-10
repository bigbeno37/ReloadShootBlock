import Events from "./Events";
import RoundState from './RoundState';

/**
 * A collection of player 1's choice, player 2's choice, and the end result
 * of the round. A utility class to make it easier to determine what happened
 * after a round has been completed
 */
export default class RoundResult {
    private readonly _player1Choice: Events;
    private readonly _player2Choice: Events;
    private readonly _result: RoundState;

    constructor(player1Choice: Events, player2Choice: Events, result: RoundState) {
        this._player1Choice = player1Choice;
        this._player2Choice = player2Choice;
        this._result = result;
    }

    getPlayer1Choice(): Events {
        return this._player1Choice;
    }

    getPlayer2Choice(): Events {
        return this._player2Choice;
    }

    getResult(): RoundState {
        return this._result;
    }

    toString(): string {
        return this._result + this._player1Choice + this._player2Choice;
    }
}