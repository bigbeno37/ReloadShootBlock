import ServerEvent from "./ServerEvent";

/**
 * Sent to the client when a new round begins<br/>
 * [[event]] must be 'new round'
 */
export default interface NewRoundEvent extends ServerEvent {}