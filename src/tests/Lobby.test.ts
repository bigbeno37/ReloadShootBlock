import Lobby from "../server/models/Lobby";
import Server from "../server/models/Server";
import NewLobbyEvent from "../shared/events/NewLobbyEvent";
import BeginGameEvent from "../shared/events/BeginGameEvent";
import RoundOverEvent from "../shared/events/RoundOverEvent";
import RoundResultImpl from "../server/RoundResultImpl";
import Events from "../server/enums/Events";
import NewRoundEvent from "../shared/events/NewRoundEvent";
import GameEndedEvent from "../shared/events/GameEndedEvent";

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

        jest.useFakeTimers();
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

        let event: NewLobbyEvent = {
            event: 'new lobby',
            lobbyID: 'A'
        };

        expect(player1.send).toHaveBeenCalledWith(JSON.stringify(event));
    });

    it('sends details to players after a round has begun', () => {
        lobby.connectPlayer(player1);
        lobby.connectPlayer(player2);

        let parameter: BeginGameEvent = {
            event: 'begin game',
            player1: lobby.getGameEngine().getPlayer1().toJSON(),
            player2: lobby.getGameEngine().getPlayer2().toJSON()
        };

        expect(player1.send).toHaveBeenLastCalledWith(JSON.stringify(parameter));
    });

    it('sends round details to players after a round has completed', () => {
        lobby.connectPlayer(player1);
        lobby.connectPlayer(player2);

        lobby.choiceHandler("shoot", player1);
        lobby.choiceHandler("reload", player2);

        let event: RoundOverEvent = {
            event: 'round over',
            results: new RoundResultImpl(Events.SHOOT, Events.RELOAD),
            player1: lobby.getGameEngine().getPlayer1().toJSON(),
            player2: lobby.getGameEngine().getPlayer2().toJSON()
        };

        expect(player1.send).toHaveBeenLastCalledWith(JSON.stringify(event));
    });

    it('begins a new round after one has been completed', () => {
        lobby.connectPlayer(player1);
        lobby.connectPlayer(player2);

        lobby.choiceHandler('shoot', player1);
        lobby.choiceHandler('reload', player2);

        jest.runAllTimers();

        let parameter: NewRoundEvent = {
            event: 'new round'
        };

        expect(player1.send).toHaveBeenLastCalledWith(JSON.stringify(parameter));
    });

    it('tells players that a lobby has concluded', () => {
        lobby.connectPlayer(player1);
        lobby.connectPlayer(player2);

        lobby.getGameEngine().getPlayer1().setPoints(4);

        lobby.choiceHandler('shoot', player1);
        lobby.choiceHandler('reload', player2);

        jest.runAllTimers();

        let event: GameEndedEvent = {
            event: 'game ended',
            winner: 'player 1'
        };

        expect(player1.send).toHaveBeenLastCalledWith(JSON.stringify(event));
    });
});