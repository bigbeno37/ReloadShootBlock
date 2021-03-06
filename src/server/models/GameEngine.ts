import Player from "./Player";
import RoundResult from "../../shared/events/RoundResult";

export default interface GameEngine {
    /**
     * Returns player 1
     * @returns {Player}
     */
    getPlayer1(): Player;

    /**
     * Returns player 2
     * @returns {Player}
     */
    getPlayer2(): Player;

    /**
     * Based on Player.getChoice() for both players, calculate what actions are to be
     * taken (e.g. if a player should lose a bullet, win a point, etc.) and return the
     * winning player. If the round is a draw, return the reason.
     * @returns {Player | RoundResultImpl}
     */
    processRound(): RoundResult;
}