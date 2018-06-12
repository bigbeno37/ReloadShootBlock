"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClipboardJS = require('clipboard/dist/clipboard.min');
var server, player1 = true;
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
// TODO: Replace with interface type
function newRound(game) {
    $(".createLobby").hide();
    $(".lobby").hide();
    $(".waiting").hide();
    $(".results").hide();
    $(".game").show();
    $(".buttons").show();
    // Populate fields with respective data
    $("#player1Score").html(player1 ? wrapWithTag('<strong>', game.player1.points) : game.player1.points);
    $("#player2Score").html(!player1 ? wrapWithTag('<strong>', game.player1.points) : game.player1.points);
    // From here, set specific player's values, thus determine which player's values
    // to retrieve
    var player = player1 ? game.player1 : game.player2;
    $("#bullets").html(player.bullets);
    $("#reloadBtn").prop("disabled", player.canReload);
    $("#shootBtn").prop("disabled", player.canShoot);
    $("#blockBtn").prop("disabled", player.canBlock);
}
function sendMove(move) {
    $(".buttons").hide();
    $(".results").hide();
    $(".waiting").show();
    console.log("Sent " + move + " to server");
    server.send(move);
}
// TODO: Replace with interface type
function showResults(results) {
    $(".buttons").hide();
    $(".waiting").hide();
    $(".results").show();
    $("#result").html(results.result);
    $("#player1Choice").html(results.player1);
    $("#player2Choice").html(results.player2);
}
$(function () {
    new ClipboardJS('.copyLobbyCode');
    // Connect to the WebSocket server
    server = new WebSocket("ws://localhost:8080");
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
            case "newlobby":
                showLobby(serverEvent.lobbyID);
                break;
            case "newround":
                newRound(serverEvent);
                break;
            case "roundover":
                showResults(serverEvent.result);
                break;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudC9zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUc1RCxJQUFJLE1BQWlCLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztBQUV0QyxtQkFBbUIsT0FBZTtJQUM5QixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFekIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQUVEO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUU1QixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUVELG1CQUFtQixPQUFlO0lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCx5REFBeUQ7QUFDekQscUJBQXFCLEdBQVcsRUFBRSxNQUFjO0lBQzVDLE9BQU8sR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDOUIsQ0FBQztBQUVELG9DQUFvQztBQUNwQyxrQkFBa0IsSUFBUztJQUN2QixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFckIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUks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