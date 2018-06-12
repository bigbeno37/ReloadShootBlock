import PlayerDetails from "./PlayerDetails";
import RoundResult from "./RoundResult";

export default interface RoundOverEvent {
    /**
     * The event, 'round over'
     */
    event: string;

    /**
     * The results of the round
     */
    results: RoundResult;

    /**
     * The current instance of player 1
     */
    player1: PlayerDetails;


    /**
     * The current instance of player 2
     */
    player2: PlayerDetails;
}