import WebSocket from 'ws';
import Lobby from "./Lobby";

/**
 * A representation of the server, containing many lobbies. The server is responsible for transferring connections
 * into a lobby, but not handling communication with clients
 */
export default class Server {
    readonly lobbies: Lobby[];

    constructor() {
        this.lobbies = [];
    }

    /**
     * Creates a new lobby instance and pushes it into [[lobbies]].
     * @param id The desired ID of the lobby
     */
    createLobby(id: string) {
        this.lobbies.push(new Lobby(id, this));
    }

    /**
     * Connects a player to a given lobby if it exists
     * @param connection The player trying to connect to the lobby
     * @param id The lobbyID of the Lobby instance the player is trying to connect to
     * @return Player has successfully connected to the lobby
     */
    connectPlayerToLobby(connection: WebSocket, id: string): boolean {
        let lobby = this.findLobbyWithID(id);

        if (lobby !== null) {
            lobby.connectPlayer(connection);

            return true;
        }

        return false;
    }

    /**
     * Find the lobby with the specified ID if it exists
     * @param id The ID of the Lobby
     * @return Instance of the Lobby if it exists, otherwise null
     */
    findLobbyWithID(id: string): Lobby | null {
        for (let i = 0; i < this.lobbies.length; i++) {
            if (this.lobbies[i].getID() === id) {
                return this.lobbies[i];
            }
        }

        return null;
    }

    /**
     * Destroys the instance of Lobby given its ID if it exists by removing the lobby from [[lobbies]]
     * and setting the instance to null
     * @param id ID of the Lobby to be destroyed
     */
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