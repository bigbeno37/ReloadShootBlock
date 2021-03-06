import NewLobbyEvent from "../shared/events/NewLobbyEvent";
import NewRoundEvent from "../shared/events/NewRoundEvent";
import RoundOverEvent from "../shared/events/RoundOverEvent";
import BeginGameEvent from "../shared/events/BeginGameEvent";
import GameEndedEvent from "../shared/events/GameEndedEvent";

const ClipboardJS = require('clipboard/dist/clipboard.min');

let server: WebSocket, player1 = false;

function showLobby(lobbyID: string) {
    $(".createLobby").hide();

    $("#lobbyID").val(location.origin.replace(/^(http|https):\/\//, '') + '/' + lobbyID);
    $(".lobby").show();
}

function createLobby() {
    server.send('create lobby');

    console.log("sent request to create lobby");
}

function joinLobby(lobbyID: string) {
    server.send('join ' + lobbyID);
}

// Takes in a tag name, and wraps the string with the tag
function wrapWithTag(tag: string, string: string) {
    return tag + string + tag;
}

function updateScores(game: RoundOverEvent | BeginGameEvent) {
// Populate fields with respective data
    $("#player1Score").html(player1 ? wrapWithTag('<strong>', game.player1.points.toString()) : game.player1.points.toString());
    $("#player2Score").html(!player1 ? wrapWithTag('<strong>', game.player2.points.toString()) : game.player2.points.toString());

    // From here, set specific player's values, thus determine which player's values
    // to retrieve
    let player = player1 ? game.player1 : game.player2;

    $("#bullets").html(player.bullets.toString());

    $("#reloadBtn").prop("disabled", !player.canReload);
    $("#shootBtn").prop("disabled", !player.canShoot);
    $("#blockBtn").prop("disabled", !player.canBlock);
}

function newRound() {
    $(".createLobby").hide();
    $(".lobby").hide();
    $(".waiting").hide();
    $(".results").hide();
    $(".gameover").hide();

    $(".game").show();
    $(".buttons").show();
}

function sendMove(move: string) {
    $(".buttons").hide();
    $(".results").hide();
    $(".waiting").show();

    console.log("Sent " + move + " to server");
    server.send(move);
}

function showResults(round: RoundOverEvent) {
    $(".buttons").hide();
    $(".waiting").hide();

    $(".results").show();

    $("#result").html(round.results.result);
    $("#player1Choice").html(round.results.player1Choice);
    $("#player2Choice").html(round.results.player2Choice);

    updateScores(round);
}

function showGameOver(serverEvent: GameEndedEvent) {
    $(".results").hide();
    $(".gameover").show();
    $("#winningPlayer").html(serverEvent.winner + ' wins the game!');

    setTimeout(() => {window.location.replace(location.origin)}, 5000);
}

$(function() {
    new ClipboardJS('.copyLobbyCode');

    // Connect to the WebSocket server
    server = new WebSocket(location.origin.replace(/^http/, 'ws'));

    server.onerror = () => {
        alert("Unable to connect to WebSocket server!");
    };

    server.onopen = () => {
        console.log("Made connection to WebSocket Server!")

        // If this is the player that is connecting to a specified lobby, then skip the main page and go straight to the
        // specified lobby (reaching this point means the lobby exists and the lobbyCode found is valid)
        if ($("#connectingTo").length !== 0) {
            player1 = false;

            joinLobby(<string>$("#connectingTo").val());
        }
    };

    server.onmessage = message => {
        console.log('Server said: ' + message.data);

        let serverEvent: NewRoundEvent | NewLobbyEvent | RoundOverEvent | GameEndedEvent = JSON.parse(message.data);

        switch (serverEvent.event) {
            case "new lobby":
                player1 = true;

                showLobby((<NewLobbyEvent>serverEvent).lobbyID);

                break;
            case "begin game":
                newRound();
                updateScores(<BeginGameEvent>serverEvent);

                break;
            case "new round":
                newRound();

                break;
            case "round over":
                showResults(<RoundOverEvent>serverEvent);
                
                break;
            case "game ended":
                showGameOver(<GameEndedEvent>serverEvent);
        }
    };
});