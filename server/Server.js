const Lobby = require('./Lobby');

class Server {
    constructor() {
        this._lobbies = [];
    }

    createLobby(id) {
        this._lobbies.push(new Lobby(id));
    }

    connectPlayerToLobby(connection, id) {
        this.findLobbyWithID(id).connectPlayer(connection);
    }

    // Return lobby with specified ID if exists, otherwise return null
    findLobbyWithID(id) {
        for (let i = 0; i < this._lobbies.length; i++) {
            if (this._lobbies[i].id === id) {
                return this._lobbies[i];
            }
        }

        return null;
    }
}

module.exports = Server;