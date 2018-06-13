import Events from "../enums/Events";
import PlayerDetails from "../../shared/events/PlayerDetails";

/**
 * The class used by [[GameEngine]] to keep track of player's details
 */
export default class Player {
    private _bullets: number;
    private _points: number;

    /**
     * How many unsuccessful blocks the player has made in a row
     */
    private _unsuccessfulBlocks: number;
    private _choice: Events | null;

    /**
     * How many bullets the player can have before not being able to add any more
     */
    private readonly _MAX_BULLETS: number;

    /**
     * How many unsuccessful blocks the player can make in a row before not being able to block for a round
     */
    private readonly _MAX_UNSUCCESSFUL_BLOCKS: number;

    constructor(MAX_BULLETS: number = 6, MAX_UNSUCCESSFUL_BLOCKS: number = 2) {
        this._bullets = 1;
        this._points = 0;
        this._unsuccessfulBlocks = 0;

        this._MAX_BULLETS = MAX_BULLETS;
        this._MAX_UNSUCCESSFUL_BLOCKS = MAX_UNSUCCESSFUL_BLOCKS;
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

    /**
     * Is the player able to shoot on this round
     * @return [[_bullets]] is greater than 0
     */
    canShoot(): boolean {
        return this._bullets > 0;
    }

    /**
     * Is the player able to reload on this round
     * @return [[_bullets]] less than [[_MAX_BULLETS]]
     */
    canReload(): boolean {
        return this._bullets < this._MAX_BULLETS;
    }

    /**
     * Is the player able to block on this round
     * @return [[_unsuccessfulBlocks]] equal to [[_MAX_UNSUCCESSFUL_BLOCKS]]
     */
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

    /**
     * Returns a [[PlayerDetails]] compliant instance of this player instance
     * @return Representation of this instance based on [[PlayerDetails]]
     */
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