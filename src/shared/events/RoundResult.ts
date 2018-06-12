import RoundState from "../../server/enums/RoundState";
import Events from '../../server/enums/Events'

export default interface RoundResult {
    result: RoundState,
    player1Choice: Events,
    player2Choice: Events
}