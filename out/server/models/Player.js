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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9tb2RlbHMvUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7SUFTSTtRQUhpQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7UUFHMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0MsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDNUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztZQUU3QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBcUI7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELHFCQUFxQixDQUFDLE1BQWM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztJQUN0QyxDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTztZQUNILE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNwQixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdEIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDNUIsQ0FBQTtJQUNMLENBQUM7Q0FDSjtBQWxGRCx5QkFrRkMifQ==