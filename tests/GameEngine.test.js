const GameEngine = require('../src/GameEngine');
const Events = require('../src/Events');

let gameEngine;

describe('Game Engine', () => {
    beforeEach(() => {
        gameEngine = new GameEngine();
    });

    it('removes a bullet when a player shoots', () => {
        expect(gameEngine.player1Bullets).toBe(1);

        gameEngine.processRound(Events.SHOOT, Events.RELOAD);

        expect(gameEngine.player1Bullets).toBe(0);
    });

    it('adds a point to player 1 when they win', () => {
        expect(gameEngine.player1Points).toBe(0);
        expect(gameEngine.player2Points).toBe(0);

        gameEngine.processRound(Events.SHOOT, Events.RELOAD);

        expect(gameEngine.player1Points).toBe(1);
        expect(gameEngine.player2Points).toBe(0);
    });

    it('adds no points when both players shoot', () => {
        expect(gameEngine.player1Points).toBe(0);
        expect(gameEngine.player2Points).toBe(0);

        gameEngine.processRound(Events.SHOOT, Events.SHOOT);

        expect(gameEngine.player1Points).toBe(0);
        expect(gameEngine.player2Points).toBe(0);
    });

    it('disables firing when bullets are below 1', () => {
        expect(gameEngine.player1CanShoot).toBeTruthy();
        expect(gameEngine.player1Bullets).toBe(1);

        gameEngine.processRound(Events.SHOOT, Events.BLOCK);

        expect(gameEngine.player1CanShoot).toBeFalsy();
        expect(gameEngine.player1Bullets).toBe(0);
    });

    it('adds a bullet after reloading', () => {
        expect(gameEngine.player1Bullets).toBe(1);

        gameEngine.processRound(Events.RELOAD, Events.BLOCK);

        expect(gameEngine.player1Bullets).toBe(2);
    });

    it("doesn't add a bullet after being shot", () => {
        expect(gameEngine.player1Bullets).toBe(1);

        gameEngine.processRound(Events.RELOAD, Events.SHOOT);

        expect(gameEngine.player1Bullets).toBe(1);
    });

    it('disables reloading after reaching 6 bullets', () => {
        expect(gameEngine.player1CanReload).toBeTruthy();

        gameEngine.processRound(Events.RELOAD, Events.BLOCK);
        gameEngine.processRound(Events.RELOAD, Events.BLOCK);
        gameEngine.processRound(Events.RELOAD, Events.BLOCK);
        gameEngine.processRound(Events.RELOAD, Events.BLOCK);
        gameEngine.processRound(Events.RELOAD, Events.BLOCK);

        expect(gameEngine.player1CanReload).toBeFalsy();
    });

    it('enables firing after reloading a bullet', () => {
        gameEngine.processRound(Events.SHOOT, Events.BLOCK);

        expect(gameEngine.player1CanShoot).toBeFalsy();

        gameEngine.processRound(Events.RELOAD, Events.BLOCK);

        expect(gameEngine.player1CanShoot).toBeTruthy()
    });

    it('disables blocking after having unsuccessfully blocked twice in a row', () => {
        expect(gameEngine.player1CanBlock).toBeTruthy();

        gameEngine.processRound(Events.BLOCK, Events.RELOAD);
        gameEngine.processRound(Events.BLOCK, Events.RELOAD);

        expect(gameEngine.player1CanBlock).toBeFalsy();
    });

    it('enables blocking after having not used block for a turn', () => {
        expect(gameEngine.player1CanBlock).toBeTruthy();

        gameEngine.processRound(Events.BLOCK, Events.RELOAD);
        gameEngine.processRound(Events.BLOCK, Events.RELOAD);
        gameEngine.processRound(Events.SHOOT, Events.BLOCK);

        expect(gameEngine.player1CanBlock).toBeTruthy();
    });
});