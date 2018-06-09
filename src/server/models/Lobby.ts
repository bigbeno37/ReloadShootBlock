import WebSocket from 'ws';

export default class Lobby {
    private id: string;

    private player1: WebSocket;
    private player2: WebSocket;

    constructor(id: string) {
        this.id = id;
    }

    connectPlayer(connection: WebSocket) {
        // If no player has been designated to player 1, the connecting player must be player 1
        if (this.player1 == null) {
            this.player1 = connection;

            connection.send(`new lobby ${this.id}`);
        }
    }

    getID() {
        return this.id;
    }
}