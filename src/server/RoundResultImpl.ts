import Events from "./enums/Events";
import RoundState from './enums/RoundState';
import RoundResult from "../shared/events/RoundResult";

/**
 * A collection of player 1's choice, player 2's choice, and the end result
 * of the round. A utility class to make it easier to determine what happened
 * after a round has been completed
 */
export default class RoundResultImpl implements RoundResult {
    public readonly player1Choice: Events;
    public readonly player2Choice: Events;
    public readonly result: RoundState;

    constructor(player1Choice: Events, player2Choice: Events) {
        this.player1Choice = player1Choice;
        this.player2Choice = player2Choice;

        if (this.player1Choice === Events.SHOOT && this.player2Choice === Events.RELOAD) {
            this.result = RoundState.Player1Won;

            return;
        }

        if (this.player2Choice === Events.SHOOT && this.player1Choice === Events.RELOAD) {
            this.result = RoundState.Player2Won;

            return;
        }

        this.result = RoundState.Draw;
    }
}