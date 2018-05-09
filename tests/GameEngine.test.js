const GameEngine = require('../GameEngine');
const Events = require('../Events');

let gameEngine;

describe('Game Engine', () => {
    beforeEach(() => {
        gameEngine = new GameEngine();
    });

    it('removes a bullet when a player shoots', () => {
        expect(gameEngine.player1Bullets).toBe(1);

        gameEngine.calculateWinner(Events.SHOOT, Events.RELOAD);

        expect(gameEngine.player1Bullets).toBe(0);
    });

    it('adds a point to player 1 when they win', () => {
        expect(gameEngine.player1Points).toBe(0);
        expect(gameEngine.player2Points).toBe(0);

        gameEngine.calculateWinner(Events.SHOOT, Events.RELOAD);

        expect(gameEngine.player1Points).toBe(1);
        expect(gameEngine.player2Points).toBe(0);
    });

    it('adds no points when both players shoot', () => {
        expect(gameEngine.player1Points).toBe(0);
        expect(gameEngine.player2Points).toBe(0);

        gameEngine.calculateWinner(Events.SHOOT, Events.SHOOT);

        expect(gameEngine.player1Points).toBe(0);
        expect(gameEngine.player2Points).toBe(0);
    });

    it('disables firing when bullets are below 1', () => {
        expect(gameEngine.player1CanShoot).toBeTruthy();
        expect(gameEngine.player1Bullets).toBe(1);

        gameEngine.calculateWinner(Events.SHOOT, Events.BLOCK);

        expect(gameEngine.player1CanShoot).toBeFalsy();
        expect(gameEngine.player1Bullets).toBe(0);
    });

    it('adds a bullet after reloading', () => {
        expect(gameEngine.player1Bullets).toBe(1);

        gameEngine.calculateWinner(Events.RELOAD, Events.BLOCK);

        expect(gameEngine.player1Bullets).toBe(2);
    });

    it("doesn't add a bullet after being shot", () => {
        expect(gameEngine.player1Bullets).toBe(1);

        gameEngine.calculateWinner(Events.RELOAD, Events.SHOOT);

        expect(gameEngine.player1Bullets).toBe(1);
    });

    it('disables reloading after reaching 6 bullets', () => {
        expect(gameEngine.player1CanReload).toBeTruthy();

        gameEngine.calculateWinner(Events.RELOAD, Events.BLOCK);
        gameEngine.calculateWinner(Events.RELOAD, Events.BLOCK);
        gameEngine.calculateWinner(Events.RELOAD, Events.BLOCK);
        gameEngine.calculateWinner(Events.RELOAD, Events.BLOCK);
        gameEngine.calculateWinner(Events.RELOAD, Events.BLOCK);

        expect(gameEngine.player1CanReload).toBeFalsy();
    });

    it('enables firing after reloading a bullet', () => {
        gameEngine.calculateWinner(Events.SHOOT, Events.BLOCK);

        expect(gameEngine.canShoot).toBeFalsy();

        gameEngine.calculateWinner(Events.RELOAD, Events.BLOCK);

        expect
    });
});