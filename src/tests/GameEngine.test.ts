import GameEngine from "../server/models/GameEngine";
import Events from '../server/enums/Events';
import GameEngineImpl from "../server/GameEngineImpl";

let gameEngine: GameEngine;

describe('Game Engine', () => {
    beforeEach(() => {
        gameEngine = new GameEngineImpl();
    });

    it('removes a bullet when a player shoots', () => {
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getBullets()).toBe(0);
    });

    it('adds a point to player 1 when they win', () => {
        expect(gameEngine.getPlayer1().getPoints()).toBe(0);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getPoints()).toBe(1);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);
    });

    it('adds no points when both players shoot', () => {
        expect(gameEngine.getPlayer1().getPoints()).toBe(0);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.SHOOT);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getPoints()).toBe(0);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);
    });

    it('disables firing when bullets are below 1', () => {
        expect(gameEngine.getPlayer1().canShoot()).toBeTruthy();
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canShoot()).toBeFalsy();
        expect(gameEngine.getPlayer1().getBullets()).toBe(0);
    });

    it('adds a bullet after reloading', () => {
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);

        gameEngine.getPlayer1().setChoice(Events.RELOAD);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getBullets()).toBe(2);
    });

    it('disables reloading after reaching 6 bullets', () => {
        expect(gameEngine.getPlayer1().canReload()).toBeTruthy();

        for (let i = 0; i < 5; i++) {
            gameEngine.getPlayer1().setChoice(Events.RELOAD);
            gameEngine.getPlayer2().setChoice(Events.BLOCK);

            gameEngine.processRound();
        }

        expect(gameEngine.getPlayer1().canReload()).toBeFalsy();
    });

    it('enables firing after reloading a bullet', () => {
        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canShoot()).toBeFalsy();

        gameEngine.getPlayer1().setChoice(Events.RELOAD);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canShoot()).toBeTruthy()
    });

    it('disables blocking after having unsuccessfully blocked twice in a row', () => {
        expect(gameEngine.getPlayer1().canBlock()).toBeTruthy();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canBlock()).toBeFalsy();
    });

    it('enables blocking after having not used block for a turn', () => {
        expect(gameEngine.getPlayer1().canBlock()).toBeTruthy();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();
        gameEngine.processRound();

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canBlock()).toBeTruthy();
    });
});