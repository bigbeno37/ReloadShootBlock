import Events from '../server/enums/Events';
import InvalidChoiceError from "../server/errors/InvalidChoiceError";
import IGameEngine from "../server/interfaces/IGameEngine";
import GameEngine from "../server/models/GameEngine";
import StandardRules from "../server/models/StandardRules";

let gameEngine: IGameEngine;

describe('Game Engine', () => {
    beforeEach(() => {
        gameEngine = new GameEngine(new StandardRules());
    });

    it('removes a bullet when a player shoots', () => {
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getBullets()).toBe(0);
        expect(gameEngine.getPlayer2().getBullets()).toBe(1);

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.SHOOT);

        gameEngine.processRound();

        expect(gameEngine.getPlayer2().getBullets()).toBe(0);
    });

    it('throws an InvalidChoiceError if the player tries to shoot without any bullets', () => {
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);
        expect(gameEngine.getPlayer2().getBullets()).toBe(1);

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.SHOOT);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getBullets()).toBe(0);
        expect(gameEngine.getPlayer2().getBullets()).toBe(0);

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.SHOOT);

        let exception: any = new InvalidChoiceError('Player cannot shoot this round!');

        expect(() => {gameEngine.processRound()}).toThrow(exception);
        expect(gameEngine.getPlayer1().getBullets()).toBe(0);
        expect(gameEngine.getPlayer2().getBullets()).toBe(0);
    });

    it('adds a point to the player when they win', () => {
        expect(gameEngine.getPlayer1().getPoints()).toBe(0);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getPoints()).toBe(1);
        expect(gameEngine.getPlayer2().getPoints()).toBe(0);

        gameEngine.getPlayer1().setChoice(Events.RELOAD);
        gameEngine.getPlayer2().setChoice(Events.SHOOT);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getPoints()).toBe(1);
        expect(gameEngine.getPlayer2().getPoints()).toBe(1);
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

        expect(gameEngine.getPlayer2().canShoot()).toBeTruthy();
        expect(gameEngine.getPlayer2().getBullets()).toBe(1);

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.SHOOT);

        gameEngine.processRound();

        expect(gameEngine.getPlayer2().canShoot()).toBeFalsy();
        expect(gameEngine.getPlayer2().getBullets()).toBe(0);
    });

    it('adds a bullet after reloading', () => {
        expect(gameEngine.getPlayer1().getBullets()).toBe(1);

        gameEngine.getPlayer1().setChoice(Events.RELOAD);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getBullets()).toBe(2);

        expect(gameEngine.getPlayer2().getBullets()).toBe(1);

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        expect(gameEngine.getPlayer2().getBullets()).toBe(2);
    });

    it('disables reloading after reaching 6 bullets', () => {
        expect(gameEngine.getPlayer1().canReload()).toBeTruthy();

        for (let i = 0; i < 2; i++) {
            gameEngine.getPlayer1().setChoice(Events.RELOAD);
            gameEngine.getPlayer2().setChoice(Events.RELOAD);

            gameEngine.processRound();
        }

        expect(gameEngine.getPlayer1().canReload()).toBeFalsy();
        expect(gameEngine.getPlayer2().canReload()).toBeFalsy();
    });

    it('enables firing after reloading a bullet', () => {
        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.SHOOT);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().getBullets()).toBe(0);
        expect(gameEngine.getPlayer1().canShoot()).toBeFalsy();
        expect(gameEngine.getPlayer2().getBullets()).toBe(0);
        expect(gameEngine.getPlayer2().canShoot()).toBeFalsy();

        gameEngine.getPlayer1().setChoice(Events.RELOAD);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canShoot()).toBeTruthy();
        expect(gameEngine.getPlayer2().canShoot()).toBeTruthy();
    });

    it('disables blocking after having unsuccessfully blocked twice in a row', () => {
        expect(gameEngine.getPlayer1().canBlock()).toBeTruthy();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canBlock()).toBeFalsy();
        expect(gameEngine.getPlayer2().canBlock()).toBeFalsy();
    });

    it('enables blocking after having not used block for a turn', () => {
        expect(gameEngine.getPlayer1().canBlock()).toBeTruthy();
        expect(gameEngine.getPlayer2().canBlock()).toBeTruthy();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canBlock()).toBeFalsy();
        expect(gameEngine.getPlayer2().canBlock()).toBeFalsy();

        gameEngine.getPlayer1().setChoice(Events.RELOAD);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canBlock()).toBeTruthy();
        expect(gameEngine.getPlayer2().canBlock()).toBeTruthy();
    });

    it('throws a MissingChoicesError if processRound is called without both players having made a choice', () => {
        let exception: any = new InvalidChoiceError('Choice cannot be null!');

        expect(() => {gameEngine.processRound()}).toThrow(exception);
    });

    it('throws an InvalidChoiceError if the player tries to block while canBlock is false', () => {
        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        expect(gameEngine.getPlayer1().canBlock()).toBeFalsy();
        expect(gameEngine.getPlayer2().canBlock()).toBeFalsy();

        let exception: any = new InvalidChoiceError('Player cannot block this round!');

        expect(() => {gameEngine.processRound()}).toThrow(exception);
    });

    it('stuns the opponent if a player blocks the opponent\'s shot', () => {
        expect(gameEngine.getPlayer1().canShoot()).toBeTruthy();
        expect(gameEngine.getPlayer2().canShoot()).toBeTruthy();

        gameEngine.getPlayer1().setChoice(Events.RELOAD);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canShoot()).toBeFalsy();
        // Verify !canShoot comes from being stunned and not from lack of bullets
        expect(gameEngine.getPlayer1().getBullets()).toBeGreaterThan(0);

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.SHOOT);

        gameEngine.processRound();

        expect(gameEngine.getPlayer2().canShoot()).toBeFalsy();
        // Verify !canShoot comes from being stunned and not from lack of bullets
        expect(gameEngine.getPlayer2().getBullets()).toBeGreaterThan(0);
    });

    it('removes stun after a round', () => {
        gameEngine.getPlayer1().setChoice(Events.RELOAD);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        gameEngine.getPlayer1().setChoice(Events.SHOOT);
        gameEngine.getPlayer2().setChoice(Events.BLOCK);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canShoot()).toBeFalsy();
        expect(gameEngine.getPlayer2().canShoot()).toBeTruthy();

        gameEngine.getPlayer1().setChoice(Events.BLOCK);
        gameEngine.getPlayer2().setChoice(Events.SHOOT);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canShoot()).toBeTruthy();
        expect(gameEngine.getPlayer2().canShoot()).toBeFalsy();

        gameEngine.getPlayer1().setChoice(Events.RELOAD);
        gameEngine.getPlayer2().setChoice(Events.RELOAD);

        gameEngine.processRound();

        expect(gameEngine.getPlayer1().canShoot()).toBeTruthy();
        expect(gameEngine.getPlayer2().canShoot()).toBeTruthy();
    });
});