import WebSocket from 'ws';
import Lobby from "./Lobby";

export default class Server {
    readonly lobbies: Lobby[];

    constructor() {
        this.lobbies = [];
    }

    createLobby(id: string) {
        this.lobbies.push(new Lobby(id, this));
    }

    connectPlayerToLobby(connection: WebSocket, id: string) {
        let lobby = this.findLobbyWithID(id);

        if (lobby !== null) lobby.connectPlayer(connection);
    }

    // Return lobby with specified ID if exists, otherwise return null
    findLobbyWithID(id: string): Lobby | null {
        for (let i = 0; i < this.lobbies.length; i++) {
            if (this.lobbies[i].getID() === id) {
                return this.lobbies[i];
            }
        }

        return null;
    }

    destroyLobby(id: string) {
        let lobby = this.findLobbyWithID(id);

        // If the lobby exists, remove it from lobbies and set the instance to
        // be null
        if (lobby) {
            this.lobbies.splice(this.lobbies.indexOf(lobby), 1);

            lobby = null;
        }
    }
}