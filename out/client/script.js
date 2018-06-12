"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClipboardJS = require('clipboard/dist/clipboard.min');
var server, player1 = false;
function showLobby(lobbyID) {
    $(".createLobby").hide();
    $("#lobbyID").val(lobbyID);
    $(".lobby").show();
}
function createLobby() {
    server.send('create lobby');
    console.log("sent request to create lobby");
}
function joinLobby(lobbyID) {
    server.send('join ' + lobbyID);
}
// Takes in a tag name, and wraps the string with the tag
function wrapWithTag(tag, string) {
    return tag + string + tag;
}
function updateScores(game) {
    // Populate fields with respective data
    $("#player1Score").html(player1 ? wrapWithTag('<strong>', game.player1.points.toString()) : game.player1.points.toString());
    $("#player2Score").html(!player1 ? wrapWithTag('<strong>', game.player2.points.toString()) : game.player2.points.toString());
    // From here, set specific player's values, thus determine which player's values
    // to retrieve
    var player = player1 ? game.player1 : game.player2;
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
    $(".game").show();
    $(".buttons").show();
}
function sendMove(move) {
    $(".buttons").hide();
    $(".results").hide();
    $(".waiting").show();
    console.log("Sent " + move + " to server");
    server.send(move);
}
// TODO: Replace with interface type
function showResults(round) {
    $(".buttons").hide();
    $(".waiting").hide();
    $(".results").show();
    $("#result").html(round.results.result);
    $("#player1Choice").html(round.results.player1Choice);
    $("#player2Choice").html(round.results.player2Choice);
    updateScores(round);
}
$(function () {
    new ClipboardJS('.copyLobbyCode');
    // Connect to the WebSocket server
    server = new WebSocket("ws" + (!$("#secure").val() ? 's' : '') + "://localhost:" + $("#port").val() + "/ws");
    server.onerror = function () {
        alert("Unable to connect to WebSocket server!");
    };
    server.onopen = function () {
        console.log("Made connection to WebSocket Server!");
        // If this is the player that is connecting to a specified lobby, then skip the main page and go straight to the
        // specified lobby (reaching this point means the lobby exists and the lobbyCode found is valid)
        if ($("#connectingTo") !== null) {
            player1 = false;
            joinLobby($("#connectingTo").val());
        }
    };
    server.onmessage = function (message) {
        console.log('Server said: ' + message.data);
        var serverEvent = JSON.parse(message.data);
        switch (serverEvent.event) {
            case "new lobby":
                player1 = true;
                showLobby(serverEvent.lobbyID);
                break;
            case "begin game":
                newRound();
                updateScores(serverEvent);
                break;
            case "new round":
                newRound();
                break;
            case "round over":
                showResults(serverEvent);
                break;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudC9zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUU1RCxJQUFJLE1BQWlCLEVBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUV2QyxtQkFBbUIsT0FBZTtJQUM5QixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFekIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQUVEO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUU1QixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUVELG1CQUFtQixPQUFlO0lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCx5REFBeUQ7QUFDekQscUJBQXFCLEdBQVcsRUFBRSxNQUFjO0lBQzVDLE9BQU8sR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDOUIsQ0FBQztBQUVELHNCQUFzQixJQUFxQztJQUMzRCx1Q0FBdUM7SUFDbkMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM1SCxDQUFDLENBQUMsZUFBZSxDQUFDLENB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