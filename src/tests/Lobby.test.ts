import Lobby from "../server/models/Lobby";
import Server from "../server/models/Server";

let lobby: Lobby;
let player1: any;
let player2: any;

describe('Lobby', () => {
    beforeEach(() => {
        lobby = new Lobby('A', new Server());

        player1 = jest.fn();
        player1.send = jest.fn();
        player1.on = jest.fn();

        player2 = jest.fn();
        player2.send = jest.fn();
        player2.on = jest.fn();

    });

    it('assigns the lobby creator to the first array index', () => {
        expect(lobby.getPlayers()).toHaveLength(0);

        lobby.connectPlayer(player1);

        expect(lobby.getPlayers()).toHaveLength(1);
        expect(lobby.getPlayers()[0]).toBe(player1);
    });

    it('prevents the player array from being changed through getPlayers', () => {
        lobby.connectPlayer(player1);

        lobby.getPlayers()[0] = player2;

        expect(lobby.getPlayers()[0]).toBe(player1);
    });

    it('sends lobby 1 A to the first player connecting to the lobby', () => {
        expect(player1.send).not.toHaveBeenCalled();

        lobby.connectPlayer(player1);

        expect(player1.send).toHaveBeenCalledWith('lobby 1 A');
    });

    it('send lobby 2 to the second player connecting to the lobby', () => {
        lobby.connectPlayer(player1);

        expect(player2.send).not.toHaveBeenCalled();

        lobby.connectPlayer(player2);

        expect(player2.send).toHaveBeenCalledWith('lobby 2');
    });

    it('sends details to players after a round has begun', () => {
        lobby.connectPlayer(player1);
        lobby.connectPlayer(player2);

        expect(player1.send).toHaveBeenLastCalledWith(
            '1 0 1 reload shoot block 2 0 1 reload shoot block'
        );
    });
});