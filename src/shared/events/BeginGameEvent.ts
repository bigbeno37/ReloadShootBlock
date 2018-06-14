import PlayerDetails from "./PlayerDetails";
import ServerEvent from "./ServerEvent";

/**
 * Sent to client at the start of a game<br/>
 * [[event]] must be 'begin game'
 */
export default interface BeginGameEvent extends ServerEvent {
    /**
     * The current instance of player 1
     */
    player1: PlayerDetails;

    /**
     * The current instance of player 2
     */
    player2: PlayerDetails;
}