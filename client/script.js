let server, player1 = true;

function showLobby(lobbyCode) {
    $(".createLobby").hide();

    $("#lobbyCode").val(lobbyCode);
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
    let player = player1 ? game.player1 : game.player2;

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

function showResults(results) {
    $(".buttons").hide();
    $(".waiting").hide();

    $(".results").show();

    $("#result").html(results.result);
    $("#player1Choice").html(results.player1);
    $("#player2Choice").html(results.player2);
}

$(function() {
    new ClipboardJS('.copyLobbyCode');

    // Connect to the WebSocket server
    server = new WebSocket("ws://localhost:8080");

    server.onerror = function() {
        alert("Unable to connect to WebSocket server!");
    };

    server.onopen = function() {
        console.log("Made connection to WebSocket Server!")

        // If this is the player that is connecting to a specified lobby, then skip the main page and go straight to the
        // specified lobby (reaching this point means the lobby exists and the lobbyCode found is valid)
        if ($("#connectingTo").length !== 0) {
            player1 = false;

            joinLobby($("#connectingTo").val());
        }
    };

    server.onmessage = function(message) {
        console.log('Server said: ' + message.data);

        let serverEvent = JSON.parse(message.data);

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