import Player from "./Player";
import Events from './Events';

export default class GameEngine {
    private readonly _player1: Player;
    private readonly _player2: Player;

    constructor() {
        this._player1 = new Player();
        this._player2 = new Player();
    }

    getPlayer1(): Player {
        return this._player1;
    }

    getPlayer2(): Player {
        return this._player2;
    }

    processRound(player1Event: Events, player2Event: Events): Player | null{
        // Determine if bullets need to be removed and if so, remove the bullets
        if (player1Event === Events.SHOOT) {
            this._player1.shoot();
        }

        if (player2Event === Events.SHOOT) {
            this._player2.shoot();
        }

        // Determine if bullets need to be added
        // This can only happen in the case that they do not die in the same round
        // i.e. a player does not shoot while they reload
        if (player1Event === Events.RELOAD && player2Event !== Events.SHOOT) {
            this._player1.reload();
        }

        if (player2Event === Events.RELOAD && player1Event !== Events.SHOOT) {
            this._player2.reload();
        }

        // Determine if the player has unsuccessfully blocked an attack
        // i.e. blocked when there was nothing to block
        if (player1Event === Events.BLOCK && player2Event !== Events.SHOOT) {
            this._player1.unsuccessfulBlock();
        }

        if (player2Event === Events.BLOCK && player1Event !== Events.SHOOT) {
            this._player2.unsuccessfulBlock();
        }

        if (player1Event !== Events.BLOCK) {
            this._player1.resetBlocks();
        }

        if (player2Event !== Events.BLOCK) {
            this._player2.resetBlocks()
        }

        // Determine if points are to be incremented
        // i.e. a player shot and the other tried to reload
        if (player1Event === Events.SHOOT && player2Event === Events.RELOAD) {
            this._player1.wonRound();

            return this._player1;
        }

        if (player2Event === Events.SHOOT && player1Event === Events.RELOAD) {
            this._player2.wonRound();

            return this._player2;
        }

        return null;
    }


}