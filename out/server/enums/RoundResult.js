"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = __importDefault(require("./Events"));
const RoundState_1 = __importDefault(require("./RoundState"));
/**
 * A collection of player 1's choice, player 2's choice, and the end result
 * of the round. A utility class to make it easier to determine what happened
 * after a round has been completed
 */
class RoundResult {
    constructor(player1Choice, player2Choice) {
        this._player1Choice = player1Choice;
        this._player2Choice = player2Choice;
        if (this._player1Choice === Events_1.default.SHOOT && this._player2Choice === Events_1.default.RELOAD) {
            this._result = RoundState_1.default.Player1Won;
            return;
        }
        if (this._player2Choice === Events_1.default.SHOOT && this._player1Choice === Events_1.default.RELOAD) {
            this._result = RoundState_1.default.Player2Won;
            return;
        }
        this._result = RoundState_1.default.Draw;
    }
    getPlayer1Choice() {
        return this._player1Choice;
    }
    getPlayer2Choice() {
        return this._player2Choice;
    }
    getResult() {
        return this._result;
    }
    toString() {
        return `${this._result} ${this._player1Choice} ${this._player2Choice}`;
    }
    toJSON() {
        return {
            player1: this._player1Choice,
            player2: this._player2Choice,
            result: this._result
        };
    }
}
exports.default = RoundResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91bmRSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2VudW1zL1JvdW5kUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLDhEQUFzQztBQUV0Qzs7OztHQUlHO0FBQ0g7SUFLSSxZQUFZLGFBQXFCLEVBQUUsYUFBcUI7UUFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLGdCQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssZ0JBQU0sQ0FBQyxNQUFNLEVBQUU7WUFDL0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBVSxDQUFDLFVBQVUsQ0FBQztZQUVyQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssZ0JBQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxnQkFBTSxDQUFDLE1BQU0sRUFBRTtZQUMvRSxJQUFJLENBQUMsT0FBTyxHQUFHLG9CQUFVLENBQUMsVUFBVSxDQUFDO1lBRXJDLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQVUsQ0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUdELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0UsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQzVCLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYztZQUM1QixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdkIsQ0FBQTtJQUNMLENBQUM7Q0FDSjtBQWhERCw4QkFnREMifQ==