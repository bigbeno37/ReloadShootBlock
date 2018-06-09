import GameEngine from "../server/models/GameEngine";
import Events from '../server/models/Events';

let gameEngine: GameEngine;

describe('Game Engine', () => {
    beforeEach(() => {
        gameEngine = new GameEngine();
    });

    it('removes a bullet when a player shoots', () => {
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);

        gameEngine.processRound(Events.SHOOT, Events.RELOAD);

        expect(gameEngine.getPlayer1().getBullets()).toBe(0);
    });

    it('adds a point to player 1 when they win', () => {
        expect(gameEngine.getPlayer1().getPoints()).toBe(0);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);

        gameEngine.processRound(Events.SHOOT, Events.RELOAD);

        expect(gameEngine.getPlayer1().getPoints()).toBe(1);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);
    });

    it('adds no points when both players shoot', () => {
        expect(gameEngine.getPlayer1().getPoints()).toBe(0);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);

        gameEngine.processRound(Events.SHOOT, Events.SHOOT);

        expect(gameEngine.getPlayer1().getPoints()).toBe(0);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);
    });

    it('disables firing when bullets are below 1', () => {
        expect(gameEngine.getPlayer1().canShoot()).toBeTruthy();
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);

        gameEngine.processRound(Events.SHOOT, Events.BLOCK);

        expect(gameEngine.getPlayer1().canShoot()).toBeFalsy();
        expect(gameEngine.getPlayer1().getBullets()).toBe(0);
    });

    it('adds a bullet after reloading', () => {
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);

        gameEngine.processRound(Events.RELOAD, Events.BLOCK);

        expect(gameEngine.getPlayer1().getBullets()).toBe(2);
    });

    it("doesn't add a bullet after being shot", () => {
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);

        gameEngine.processRound(Events.RELOAD, Events.SHOOT);

        expect(gameEngine.getPlayer1().getBullets()).toBe(1);
    });

    it('disables reloading after reaching 6 bullets', () => {
        expect(gameEngine.getPlayer1().canReload()).toBeTruthy();

        gameEngine.processRound(Events.RELOAD, Events.BLOCK);
        gameEngine.processRound(Events.RELOAD, Events.BLOCK);
        gameEngine.processRound(Events.RELOAD, Events.BLOCK);
        gameEngine.processRound(Events.RELOAD, Events.BLOCK);
        gameEngine.processRound(Events.RELOAD, Events.BLOCK);

        expect(gameEngine.getPlayer1().canReload()).toBeFalsy();
    });

    it('enables firing after reloading a bullet', () => {
        gameEngine.processRound(Events.SHOOT, Events.BLOCK);

        expect(gameEngine.getPlayer1().canShoot()).toBeFalsy();

        gameEngine.processRound(Events.RELOAD, Events.BLOCK);

        expect(gameEngine.getPlayer1().canShoot()).toBeTruthy()
    });

    it('disables blocking after having unsuccessfully blocked twice in a row', () => {
        expect(gameEngine.getPlayer1().canBlock()).toBeTruthy();

        gameEngine.processRound(Events.BLOCK, Events.RELOAD);
        gameEngine.processRound(Events.BLOCK, Events.RELOAD);

        expect(gameEngine.getPlayer1().canBlock()).toBeFalsy();
    });

    it('enables blocking after having not used block for a turn', () => {
        expect(gameEngine.getPlayer1().canBlock()).toBeTruthy();

        gameEngine.processRound(Events.BLOCK, Events.RELOAD);
        gameEngine.processRound(Events.BLOCK, Events.RELOAD);
        gameEngine.processRound(Events.SHOOT, Events.BLOCK);

        expect(gameEngine.getPlayer1().canBlock()).toBeTruthy();
    });
});