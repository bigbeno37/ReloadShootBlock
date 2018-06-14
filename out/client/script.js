"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClipboardJS = require('clipboard/dist/clipboard.min');
var server, player1 = false;
function showLobby(lobbyID) {
    $(".createLobby").hide();
    $("#lobbyID").val(location.origin.replace(/^(http|https):\/\//, '') + '/' + lobbyID);
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
    $(".gameover").hide();
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
function showResults(round) {
    $(".buttons").hide();
    $(".waiting").hide();
    $(".results").show();
    $("#result").html(round.results.result);
    $("#player1Choice").html(round.results.player1Choice);
    $("#player2Choice").html(round.results.player2Choice);
    updateScores(round);
}
function showGameOver(serverEvent) {
    $(".results").hide();
    $(".gameover").show();
    $("#winningPlayer").html(serverEvent.winner + ' wins the game!');
    setTimeout(function () { window.location.replace(location.origin); }, 5000);
}
$(function () {
    new ClipboardJS('.copyLobbyCode');
    // Connect to the WebSocket server
    server = new WebSocket(location.origin.replace(/^http/, 'ws'));
    server.onerror = function () {
        alert("Unable to connect to WebSocket server!");
    };
    server.onopen = function () {
        console.log("Made connection to WebSocket Server!");
        // If this is the player that is connecting to a specified lobby, then skip the main page and go straight to the
        // specified lobby (reaching this point means the lobby exists and the lobbyCode found is valid)
        if ($("#connectingTo").length !== 0) {
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
            case "game ended":
                showGameOver(serverEvent);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudC9zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUU1RCxJQUFJLE1BQWlCLEVBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUV2QyxtQkFBbUIsT0FBZTtJQUM5QixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFekIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDckYsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3ZCLENBQUM7QUFFRDtJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRCxtQkFBbUIsT0FBZTtJQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQseURBQXlEO0FBQ3pELHFCQUFxQixHQUFXLEVBQUUsTUFBYztJQUM1QyxPQUFPLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQzlCLENBQUM7QUFFRCxzQkFBc0IsSUFBcUM7SUFDM0QsdUNBQXVDO0lBQ25DLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxP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