let server;

$(function() {
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
    }
});

function createGame() {
    // TODO: Use websocket to create new lobby

    server.send('something');

    console.log("sent something");
}