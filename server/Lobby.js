class Lobby {
    constructor(id) {
        this._id = id;

        this._player1 = null;
        this._player2 = null;
    }

    connectPlayer(connection) {
        // If no player has been designated to player 1, the connecting player must be player 1
        if (this._player1 == null) {
            this._player1 = connection;

            connection.send(`new lobby ${this._id}`);
        }
    }

    get id() {
        return this._id;
    }
}

module.exports = Lobby;