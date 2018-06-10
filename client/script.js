let server;

function showLobby(lobbyCode) {
    $(".createLobby").hide();

    $("#lobbyCode").val(lobbyCode);
    $(".lobby").show();
}

function createGame() {
    server.send('create lobby');

    console.log("sent request to create lobby");
}

$(function() {

    // If this is the player that is connecting to a specified lobby, then skip the main page and go straight to the
    // specified lobby (reaching this point means the lobby exists and the lobbyCode found is valid)
    if ($("#connectingTo").length === 0) {

    }


    new ClipboardJS('.copyLobbyCode');

    // Hide unnecessary divs until required
    $(".lobby").hide();

    // Connect to the WebSocket server
    server = new WebSocket("ws://localhost:8080");

    server.onerror = function() {
        alert("Unable to connect to WebSocket server!");
    };

    server.onopen = function() {
        console.log("Made connection to WebSocket Server!")
    };

    server.onmessage = function(message) {
        console.log('Server said: ' + message.data);

        let options = message.data.split(' ');

        switch (options[0]) {
            case "lobby":
                // If player 1 in lobby, show lobby screen with code on index 2 and set currentPlayer as 2
                // If player 2 in lobby, set currentPlayer as 2
                if (options[1] === "1") {
                    showLobby(options[2]);
                }

                break;
        }
    }
});