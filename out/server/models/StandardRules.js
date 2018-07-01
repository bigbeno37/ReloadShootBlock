"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./Player"));
const Events_1 = __importDefault(require("../enums/Events"));
class StandardRules {
    /**
     * On the current player reloading, add a bullet and reset the unsuccessful blocks counter
     * @param player
     * @param opponentsChoice
     */
    onReload(player, opponentsChoice) {
        player.addBullet();
        player.setUnsuccessfulBlocks(0);
    }
    /**
     * On the current player shooting, remove a bullet, reset the unsuccessful blocks counter and:
     * 1. If the opponent reloads, add a point
     * 2. If the opponent blocks, stun the player
     *
     * @param player
     * @param opponentsChoice
     */
    onShoot(player, opponentsChoice) {
        switch (opponentsChoice) {
            case Events_1.default.RELOAD:
                player.addPoint();
                break;
            case Events_1.default.BLOCK:
                player.setStunned(true);
                break;
        }
        player.removeBullet();
        player.setUnsuccessfulBlocks(0);
    }
    /**
     * On the current player blocking:
     * 1. If the opponent's choice was not shoot, increment the unsuccessful blocks counter by one
     * 2. If the opponent's choice was shoot, reset the unsuccessful blocks counter
     * @param player
     * @param opponentsChoice
     */
    onBlock(player, opponentsChoice) {
        if (opponentsChoice !== Events_1.default.SHOOT) {
            player.addUnsuccessfulBlock();
            return;
        }
        // Opponent selected shoot
        player.setUnsuccessfulBlocks(0);
    }
    /**
     * Returns a new instance of [[Player]] with [[Player.MAX_BULLETS]] set to 3 and
     * [[Player.MAX_UNSUCCESSFUL_BLOCKS]] set to 2
     * @return {Player}
     */
    createPlayer() {
        return new Player_1.default(3, 2);
    }
}
exports.default = StandardRules;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhbmRhcmRSdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbW9kZWxzL1N0YW5kYXJkUnVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxzREFBOEI7QUFDOUIsNkRBQXFDO0FBRXJDO0lBQ0k7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxNQUFjLEVBQUUsZUFBdUI7UUFDNUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE9BQU8sQ0FBQyxNQUFjLEVBQUUsZUFBdUI7UUFDM0MsUUFBUSxlQUFlLEVBQUU7WUFDckIsS0FBSyxnQkFBTSxDQUFDLE1BQU07Z0JBQ2QsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUVsQixNQUFNO1lBQ1YsS0FBSyxnQkFBTSxDQUFDLEtBQUs7Z0JBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFeEIsTUFBTTtTQUNiO1FBRUQsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsT0FBTyxDQUFDLE1BQWMsRUFBRSxlQUF1QjtRQUMzQyxJQUFJLGVBQWUsS0FBSyxnQkFBTSxDQUFDLEtBQUssRUFBRTtZQUNsQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUU5QixPQUFPO1NBQ1Y7UUFFRCwwQkFBMEI7UUFDMUIsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsWUFBWTtRQUNSLE9BQU8sSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBRUo7QUE5REQsZ0NBOERDIn0=