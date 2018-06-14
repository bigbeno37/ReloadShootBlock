import ServerEvent from "./ServerEvent";
import Player from "../../server/models/Player";

/**
 * Sent to the client once the lobby has concluded<br/>
 * [[event]] must be 'game ended'
 */
export default interface GameEndedEvent extends ServerEvent {
    /**
     * The player that won the game
     */
    winner: string;
}