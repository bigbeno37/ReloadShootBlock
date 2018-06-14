"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Lobby_1 = __importDefault(require("./Lobby"));
class Server {
    constructor() {
        this.lobbies = [];
    }
    createLobby(id) {
        this.lobbies.push(new Lobby_1.default(id, this));
    }
    connectPlayerToLobby(connection, id) {
        let lobby = this.findLobbyWithID(id);
        if (lobby !== null)
            lobby.connectPlayer(connection);
    }
    // Return lobby with specified ID if exists, otherwise return null
    findLobbyWithID(id) {
        for (let i = 0; i < this.lobbies.length; i++) {
            if (this.lobbies[i].getID() === id) {
                return this.lobbies[i];
            }
        }
        return null;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0RBQTRCO0FBRTVCO0lBR0k7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsV0FBVyxDQUFDLEVBQVU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELG9CQUFvQixDQUFDLFVBQXFCLEVBQUUsRUFBVTtRQUNsRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLElBQUksS0FBSyxLQUFLLElBQUk7WUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxrRUFBa0U7SUFDbEUsZUFBZSxDQUFDLEVBQVU7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksQ0FBQyxFQUFVO1FBQ25CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFckMsc0VBQXNFO1FBQ3RFLFVBQVU7UUFDVixJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXBELEtBQUssR0FBRyxJQUFJLENBQUM7U0FDaEI7SUFDTCxDQUFDO0NBQ0o7QUF2Q0QseUJBdUNDIn0=