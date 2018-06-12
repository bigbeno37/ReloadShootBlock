"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = __importDefault(require("./enums/Events"));
const RoundState_1 = __importDefault(require("./enums/RoundState"));
/**
 * A collection of player 1's choice, player 2's choice, and the end result
 * of the round. A utility class to make it easier to determine what happened
 * after a round has been completed
 */
class RoundResultImpl {
    constructor(player1Choice, player2Choice) {
        this.player1Choice = player1Choice;
        this.player2Choice = player2Choice;
        if (this.player1Choice === Events_1.default.SHOOT && this.player2Choice === Events_1.default.RELOAD) {
            this.result = RoundState_1.default.Player1Won;
            return;
        }
        if (this.player2Choice === Events_1.default.SHOOT && this.player1Choice === Events_1.default.RELOAD) {
            this.result = RoundState_1.default.Player2Won;
            return;
        }
        this.result = RoundState_1.default.Draw;
    }
}
exports.default = RoundResultImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91bmRSZXN1bHRJbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9Sb3VuZFJlc3VsdEltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBb0M7QUFDcEMsb0VBQTRDO0FBRzVDOzs7O0dBSUc7QUFDSDtJQUtJLFlBQVksYUFBcUIsRUFBRSxhQUFxQjtRQUNwRCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUVuQyxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssZ0JBQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxnQkFBTSxDQUFDLE1BQU0sRUFBRTtZQUM3RSxJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFVLENBQUMsVUFBVSxDQUFDO1lBRXBDLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxnQkFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLGdCQUFNLENBQUMsTUFBTSxFQUFFO1lBQzdFLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQVUsQ0FBQyxVQUFVLENBQUM7WUFFcEMsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBVSxDQUFDLElBQUksQ0FBQztJQUNsQyxDQUFDO0NBQ0o7QUF2QkQsa0NBdUJDIn0=