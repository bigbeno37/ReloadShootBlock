export default interface PlayerDetails {
    /**
     * Amount of points the player has
     */
    points: number;

    /**
     * Amount of bullets the player has
     */
    bullets: number;

    /**
     * Can the player reload in this round
     */
    canReload: boolean;

    /**
     * Can the player shoot in this round
     */
    canShoot: boolean;


    /**
     * Can the player block in this round
     */
    canBlock: boolean;
}