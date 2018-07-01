import IGameRules from "../interfaces/IGameRules";
import Player from "./Player";
import Events from "../enums/Events";

export default class StandardRules implements IGameRules {
    /**
     * On the current player reloading, add a bullet and reset the unsuccessful blocks counter
     * @param player
     * @param opponentsChoice
     */
    onReload(player: Player, opponentsChoice: Events): void {
        player.addBullet();
        player.setUnsuccessfulBlocks(0);
    }

    /**
     * On the current player shooting, remove a bullet, reset the unsuccessful blocks counter and:
     * 1. If the opponent reloads, add a point
     * 2. If the opponent blocks, stun the player
     *
     * @param player
     * @param opponentsChoice
     */
    onShoot(player: Player, opponentsChoice: Events): void {
        switch (opponentsChoice) {
            case Events.RELOAD:
                player.addPoint();

                break;
            case Events.BLOCK:
                player.setStunned(true);

                break;
        }

        player.removeBullet();
        player.setUnsuccessfulBlocks(0);
    }

    /**
     * On the current player blocking:
     * 1. If the opponent's choice was not shoot, increment the unsuccessful blocks counter by one
     * 2. If the opponent's choice was shoot, reset the unsuccessful blocks counter
     * @param player
     * @param opponentsChoice
     */
    onBlock(player: Player, opponentsChoice: Events): void {
        if (opponentsChoice !== Events.SHOOT) {
            player.addUnsuccessfulBlock();

            return;
        }

        // Opponent selected shoot
        player.setUnsuccessfulBlocks(0);
    }

    /**
     * Returns a new instance of [[Player]] with [[Player.MAX_BULLETS]] set to 3 and
     * [[Player.MAX_UNSUCCESSFUL_BLOCKS]] set to 2
     * @return {Player}
     */
    createPlayer(): Player {
        return new Player(3, 2);
    }

}