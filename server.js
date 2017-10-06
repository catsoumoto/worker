"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require("amqp");
var connection = amqp.createConnection({ host: 'rabbit-server' });
// add this for better debuging
connection.on('error', function (e) {
    console.log("Error from amqp: ", e);
});
// Wait for connection to become established.
connection.on('ready', function () {
    // Use the default 'amq.topic' exchange
    connection.queue('worker', function (q) {
        // Catch all messages
        q.bind('#');
        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log(message);
        });
    });
});
//# sourceMappingURL=server.js.map