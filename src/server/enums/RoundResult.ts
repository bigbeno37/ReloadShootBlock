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

    constructor(player1Choice: Events, player2Choice: Events) {
        this._player1Choice = player1Choice;
        this._player2Choice = player2Choice;

        if (this._player1Choice === Events.SHOOT && this._player2Choice === Events.RELOAD) {
            this._result = RoundState.Player1Won;

            return;
        }

        if (this._player2Choice === Events.SHOOT && this._player1Choice === Events.RELOAD) {
            this._result = RoundState.Player2Won;

            return;
        }

        this._result = RoundState.Draw;
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
        return `${this._result} ${this._player1Choice} ${this._player2Choice}`;
    }

    toJSON() {
        return {
            player1: this._player1Choice,
            player2: this._player2Choice,
            result: this._result
        }
    }
}