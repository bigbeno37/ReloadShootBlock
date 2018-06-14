"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lobby_1 = __importDefault(require("./Lobby"));
/**
 * A representation of the server, containing many lobbies. The server is responsible for transferring connections
 * into a lobby, but not handling communication with clients
 */
class Server {
    constructor() {
        this.lobbies = [];
    }
    /**
     * Creates a new lobby instance and pushes it into [[lobbies]].
     * @param id The desired ID of the lobby
     */
    createLobby(id) {
        this.lobbies.push(new Lobby_1.default(id, this));
    }
    /**
     * Connects a player to a given lobby if it exists
     * @param connection The player trying to connect to the lobby
     * @param id The lobbyID of the Lobby instance the player is trying to connect to
     * @return Player has successfully connected to the lobby
     */
    connectPlayerToLobby(connection, id) {
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
    findLobbyWithID(id) {
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
    destroyLobby(id) {
        let lobby = this.findLobbyWithID(id);
        // If the lobby exists, remove it from lobbies and set the instance to
        // be null
        if (lobby) {
            this.lobbies.splice(this.lobbies.indexOf(lobby), 1);
            lobby = null;
        }
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0RBQTRCO0FBRTVCOzs7R0FHRztBQUNIO0lBR0k7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLEVBQVU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsb0JBQW9CLENBQUMsVUFBcUIsRUFBRSxFQUFVO1FBQ2xELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFaEMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZUFBZSxDQUFDLEVBQVU7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUMsRUFBVTtRQUNuQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLHNFQUFzRTtRQUN0RSxVQUFVO1FBQ1YsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVwRCxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztDQUNKO0FBaEVELHlCQWdFQyJ9