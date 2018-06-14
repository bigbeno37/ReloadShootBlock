import ServerEvent from "./ServerEvent";

/**
 * Sent to the client after creating a new lobby<br/>
 * [[event]] must be 'new lobby'
 */
export default interface NewLobbyEvent extends ServerEvent {
    /**
     * The ID of the lobby the current player has joined
     */
    lobbyID: string;
}