import Events from "./Events";

export default class Player {
    private _bullets: number;
    private _points: number;
    private _unsuccessfulBlocks: number;
    private _choice: Events;

    constructor() {
        this._bullets = 1;
        this._points = 0;
        this._unsuccessfulBlocks = 0;
    }

    getBullets(): number {
        return this._bullets;
    }

    getPoints(): number {
        return this._points;
    }

    canShoot(): boolean {
        return this._bullets > 0;
    }

    canReload(): boolean {
        return this._bullets < 6;
    }

    canBlock(): boolean {
        if (this._unsuccessfulBlocks === 2) {
            this._unsuccessfulBlocks = 0;

            return false;
        }

        return true;
    }

    shoot() {
        this._bullets--;
    }

    reload() {
        this._bullets++;
    }

    wonRound() {
        this._points++;
    }

    unsuccessfulBlock() {
        this._unsuccessfulBlocks++;
    }

    resetBlocks() {
        this._unsuccessfulBlocks = 0;
    }

    setChoice(choice: Events) {
        this._choice = choice;
    }

    getChoice() {
        return this._choice;
    }
}