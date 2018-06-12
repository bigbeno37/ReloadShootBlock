export default interface NewLobbyEvent {
    /**
     * The event, 'new lobby'
     */
    event: string;

    /**
     * The ID of the lobby the current player has joined
     */
    lobbyID: string;
}