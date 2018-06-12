import Events from "../enums/Events";
import PlayerDetails from "../../shared/events/PlayerDetails";

export default class Player {
    private _bullets: number;
    private _points: number;
    private _unsuccessfulBlocks: number;
    private _choice: Events | null;

    private readonly _MAX_BULLETS = 6;
    private readonly _MAX_UNSUCCESSFUL_BLOCKS = 2;

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

    setPoints(points: number) {
        this._points = points;
    }

    canShoot(): boolean {
        return this._bullets > 0;
    }

    canReload(): boolean {
        return this._bullets < this._MAX_BULLETS;
    }

    canBlock(): boolean {
        if (this._unsuccessfulBlocks === this._MAX_UNSUCCESSFUL_BLOCKS) {
            this._unsuccessfulBlocks = 0;

            return false;
        }

        return true;
    }

    setChoice(choice: Events | null) {
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

    toJSON(): PlayerDetails {
        return {
            points: this._points,
            bullets: this._bullets,
            canReload: this.canReload(),
            canShoot: this.canShoot(),
            canBlock: this.canBlock()
        }
    }
}