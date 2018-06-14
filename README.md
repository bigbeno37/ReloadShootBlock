# ReloadShootBlock
A nodejs based multiplayer Western spin on the classic Rock, Paper, Scissors!

## How to run
If using npm:
`npm install`
`npm run start`

If using yarn:
`yarn install`
`yarn start`

It should be as simple as that. If `process.env.PORT` is defined (aka have PORT as a defined environment variable) it will use that port, otherwise the server will run on port 3000. After running one of the aboving commands, head over to http://localhost:3000 and enjoy! If you encounter any issues, create a new issue and we'll work to get it resolved.

## How to contribute
A good place to start is to check the docs at http://bigbeno37.github.io/ReloadShootBlock. The server first calls index.ts, which then loads up an express server with WebSocket and regular HTTP routes defined.

To build, use `npm run compile-and-run` or `yarn compile-and-run` which will compile all files under src, and start up the express server found in index.ts.

To run tests, use `npm run test` or `yarn test`. When submitting a PR, ALL tests must pass in order to be considered for approval, and this will be checked through https://travis-ci.org/bigbeno37/ReloadShootBlock

If adding / editing comments, use `npm run docs` or `yarn docs` to generate a new set of docs. PR's of this nature are very likely to be approved.

## Future landmarks
### 1.1 - Futureproofing and finishing prototype
 - Integrate TypeDoc and related comments into the source
 - Add a stun mechanic where a player is stunned (unable to shoot) for a round if opponent blocked their shot
 - After a game's conclusion, send connected players back to the homepage
 - Set max bullets to 3
### 1.2 - Better UX
 - More tests for Lobby and Server
 - In a game, receive a notification if your opponent disconnects
 - In a game, receive a notification if you disconnect
 - Allow rejoining of a game in progress
 - Allow players in a game to leave the lobby and return to the homepage
 - Add the ability to view rules about the game (what does block do if your opponent shoots you etc.)
### 1.3 - Customisable lobbies
 - Before joining a game, players can choose a nickname
 - When creating the lobby, players can choose how many points are needed to win, as well as number of bullets to start with in addition to maximum amount of bullets
### 1.4 - Improving UI
 - TBD
