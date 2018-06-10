"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor() {
        this._MAX_BULLETS = 6;
        this._MAX_UNSUCCESSFUL_BLOCKS = 2;
        this._bullets = 1;
        this._points = 0;
        this._unsuccessfulBlocks = 0;
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
    canShoot() {
        return this._bullets > 0;
    }
    canReload() {
        return this._bullets < this._MAX_BULLETS;
    }
    canBlock() {
        if (this._unsuccessfulBlocks === this._MAX_UNSUCCESSFUL_BLOCKS) {
            this._unsuccessfulBlocks = 0;
            return false;
        }
        return true;
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
    toString() {
        return this._points + ' ' + this._bullets
            + (this.canReload() ? ' reload' : '')
            + (this.canShoot() ? ' shoot' : '')
            + (this.canBlock() ? ' block' : '');
    }
}
exports.default = Player;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFTSTtRQUhpQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7UUFHMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0MsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDNUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztZQUU3QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBYztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQscUJBQXFCLENBQUMsTUFBYztRQUNoQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRO2NBQ25DLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztjQUNuQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Y0FDakMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNKO0FBL0VELHlCQStFQyJ9