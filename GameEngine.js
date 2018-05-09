const Events = require('./Events');

class GameEngine {

    constructor() {
        this._player1Points = 0;
        this._player2Points = 0;

        this._player1Bullets = 1;
        this._player2Bullets = 1;

        this._player1CanShoot = true;
        this._player2CanShoot = true;

        this._player1CanReload = true;
        this._player2CanReload = true;
    }


    get player1Points() {
        return this._player1Points;
    }

    get player2Points() {
        return this._player2Points;
    }

    get player1Bullets() {
        return this._player1Bullets;
    }

    get player2Bullets() {
        return this._player2Bullets;
    }

    get player1CanShoot() {
        return this._player1CanShoot;
    }

    get player2CanShoot() {
        return this._player2CanShoot;
    }

    get player1CanReload() {
        return this._player1CanReload;
    }

    get player2CanReload() {
        return this._player2CanReload;
    }

    calculateWinner(player1Event, player2Event) {
        // Determine if bullets need to be removed and if so, remove the bullets
        if (player1Event === Events.SHOOT) {
            this._player1Bullets--;
        }

        if (player2Event === Events.SHOOT) {
            this._player2Bullets--;
        }

        // Determine if bullets need to be added
        // This can only happen in the case that they do not die in the same round
        // i.e. a player does not shoot while they reload
        if (player1Event === Events.RELOAD && player2Event !== Events.SHOOT) {
            this._player1Bullets++;
        }

        if (player2Event === Events.RELOAD && player1Event !== Events.SHOOT) {
            this._player1Bullets++;
        }

        // Determine if points are to be incremented
        // i.e. a player shot and the other tried to reload
        if (player1Event === Events.SHOOT && player2Event === Events.RELOAD) {
            this._player1Points++;
        }

        if (player2Event === Events.SHOOT && player1Event === Events.RELOAD) {
            this._player2Points++;
        }

        this._player1CanShoot = this._player1Bullets >= 1;
        this._player2CanShoot = this._player2Bullets >= 1;

        this._player1CanReload = this._player1Bullets < 6;
        this._player2CanReload = this._player2Bullets < 6;
    }


}

module.exports = GameEngine;