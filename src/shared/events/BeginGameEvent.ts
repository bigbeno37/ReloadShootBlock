import PlayerDetails from "./PlayerDetails";

export default interface BeginGameEvent {
    /**
     * The event itself (i.e. 'begin game')
     */
    event: string;

    /**
     * The current instance of player 1
     */
    player1: PlayerDetails;

    /**
     * The current instance of player 2
     */
    player2: PlayerDetails;
}