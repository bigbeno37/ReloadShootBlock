"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The class used by [[GameEngine]] to keep track of player's details
 */
class Player {
    constructor(MAX_BULLETS, MAX_UNSUCCESSFUL_BLOCKS) {
        this._bullets = 1;
        this._points = 0;
        this._unsuccessfulBlocks = 0;
        this._stunned = false;
        this._choice = null;
        this.MAX_BULLETS = MAX_BULLETS;
        this.MAX_UNSUCCESSFUL_BLOCKS = MAX_UNSUCCESSFUL_BLOCKS;
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
     * @return [[_bullets]] less than [[MAX_BULLETS]]
     */
    canReload() {
        return this._bullets < this.MAX_BULLETS;
    }
    /**
     * Is the player able to block on this round
     * @return [[_unsuccessfulBlocks]] less than [[MAX_UNSUCCESSFUL_BLOCKS]]
     */
    canBlock() {
        return this._unsuccessfulBlocks < this.MAX_UNSUCCESSFUL_BLOCKS;
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
    getMaxBullets() {
        return this.MAX_BULLETS;
    }
    setStunned(stunned) {
        this._stunned = stunned;
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
}
exports.default = Player;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7O0dBRUc7QUFDSDtJQXFCSSxZQUFZLFdBQW1CLEVBQUUsdUJBQStCO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHVCQUF1QixDQUFDO0lBQzNELENBQUM7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBYztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7SUFDbkUsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFxQjtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQscUJBQXFCLENBQUMsTUFBYztRQUNoQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFnQjtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTTtRQUNGLE9BQU87WUFDSCxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQzVCLENBQUE7SUFDTCxDQUFDO0NBQ0o7QUFySEQseUJBcUhDIn0=