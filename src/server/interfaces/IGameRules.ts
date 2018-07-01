import Player from "../models/Player";
import Events from "../enums/Events";

export default interface IGameRules {
    /**
     * The player reloaded, so determine actions to take on this [[Player]] given the opponentsChoice's [[Events]] choice.
     *
     * @param player
     * @param opponentsChoice
     */
    onReload(player: Player, opponentsChoice: Events): void;

    /**
     * The player shot, so determine actions to take on this [[Player]] given the opponent's [[Events]] choice.
     *
     * @param player
     * @param opponentsChoice
     */
    onShoot(player: Player, opponentsChoice: Events): void;

    /**
     * The player blocked, so determine actions to take on this [[Player]] given the opponent's [[Events]] choice.
     *
     * @param player
     * @param opponentsChoice
     */
    onBlock(player: Player, opponentsChoice: Events): void;

    /**
     * Return a new instance of [[Player]] with desired properties (e.g. max bullets)
     * @return {Player}
     */
    createPlayer(): Player;
}