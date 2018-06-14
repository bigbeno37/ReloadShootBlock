import PlayerDetails from "./PlayerDetails";
import RoundResult from "./RoundResult";
import ServerEvent from "./ServerEvent";

/**
 * Sent to the client when a round has finished<br/>
 * [[event]] must be 'round over'
 */
export default interface RoundOverEvent extends ServerEvent {
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