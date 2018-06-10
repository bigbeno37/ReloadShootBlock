import Events from "../enums/Events";

export default class Player {
    private _bullets: number;
    private _points: number;
    private _unsuccessfulBlocks: number;
    private _choice: Events;
    private readonly _MAX_BULLETS = 6;

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
        return this._bullets < this._MAX_BULLETS;
    }

    canBlock(): boolean {
        if (this._unsuccessfulBlocks === 2) {
            this._unsuccessfulBlocks = 0;

            return false;
        }

        return true;
    }

    setChoice(choice: Events) {
        this._choice = choice;
    }

    getChoice() {
        return this._choice;
    }

    removeBullet() {
        this._bullets--;
    }

    addPoint() {
        this._points++;
    }

    addBullet() {
        this._bullets++;
    }

    setUnsuccessfulBlocks(blocks: number) {
        this._unsuccessfulBlocks = blocks;
    }

    addUnsuccessfulBlock() {
        this._unsuccessfulBlocks++;
    }

    toString(): string {
        return this._points + ' ' + this._bullets
            + (this.canReload() ? ' reload' : '')
            + (this.canShoot() ? ' shoot' : '')
            + (this.canBlock() ? ' block' : '');
    }
}