"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The class used by [[GameEngine]] to keep track of player's details
 */
class Player {
    constructor(MAX_BULLETS = 3, MAX_UNSUCCESSFUL_BLOCKS = 2) {
        this._bullets = 1;
        this._points = 0;
        this._unsuccessfulBlocks = 0;
        this._stunned = false;
        this._choice = null;
        this._MAX_BULLETS = MAX_BULLETS;
        this._MAX_UNSUCCESSFUL_BLOCKS = MAX_UNSUCCESSFUL_BLOCKS;
    }
    getBullets() {
        return this._bullets;
    }
    getPoints() {
        return this._points;
    }
    setPoints(points) {
        this._points = points;
    }
    /**
     * Is the player able to shoot on this round
     * @return [[_bullets]] is greater than 0 AND not [[_stunned]]
     */
    canShoot() {
        return this._bullets > 0 && !this._stunned;
    }
    /**
     * Is the player able to reload on this round
     * @return [[_bullets]] less than [[_MAX_BULLETS]]
     */
    canReload() {
        return this._bullets < this._MAX_BULLETS;
    }
    /**
     * Is the player able to block on this round
     * @return [[_unsuccessfulBlocks]] less than [[_MAX_UNSUCCESSFUL_BLOCKS]]
     */
    canBlock() {
        return this._unsuccessfulBlocks < this._MAX_UNSUCCESSFUL_BLOCKS;
    }
    setChoice(choice) {
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
    setUnsuccessfulBlocks(blocks) {
        this._unsuccessfulBlocks = blocks;
    }
    addUnsuccessfulBlock() {
        this._unsuccessfulBlocks++;
    }
    /**
     * Returns a [[PlayerDetails]] compliant instance of this player instance
     * @return Representation of this instance based on [[PlayerDetails]]
     */
    toJSON() {
        return {
            points: this._points,
            bullets: this._bullets,
            canReload: this.canReload(),
            canShoot: this.canShoot(),
            canBlock: this.canBlock()
        };
    }
    getMaxBullets() {
        return this._MAX_BULLETS;
    }
    setStunned(stunned) {
        this._stunned = stunned;
    }
}
exports.default = Player;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7O0dBRUc7QUFDSDtJQXFCSSxZQUFZLGNBQXNCLENBQUMsRUFBRSwwQkFBa0MsQ0FBQztRQUNwRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyx1QkFBdUIsQ0FBQztJQUM1RCxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDO0lBQ3BFLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBcUI7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELHFCQUFxQixDQUFDLE1BQWM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztJQUN0QyxDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNO1FBQ0YsT0FBTztZQUNILE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdEIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDNUIsQ0FBQTtJQUNMLENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBZ0I7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztDQUNKO0FBckhELHlCQXFIQyJ9