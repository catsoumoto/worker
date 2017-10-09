"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require("amqp");
var connectionGet = amqp.createConnection({
    host: 'rabbitserver',
    login: 'fravaud',
    password: 'BBjakmlc100489'
});
// add this for better debuging
connectionGet.on('error', function (e) {
    console.log("Error from amqp: ", e);
});
var connectionPush = amqp.createConnection({
    host: 'rabbitserver',
    login: 'fravaud',
    password: 'BBjakmlc100489'
});
// add this for better debuging
connectionPush.on('error', function (e) {
    console.log("Error from amqp: ", e);
});
connectionPush.on('ready', function () {
    console.log('Connect to (rabbitserver) connectionPush');
});
// Wait for connection to become established.
connectionGet.on('ready', function () {
    console.log('Connect to (rabbitserver) connectionGet');
    // Use the default 'amq.topic' exchange
    connectionGet.queue('worker', function (q) {
        // Catch all messages
        q.bind('#');
        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log("Worker msg:" + JSON.stringify(message.uuid));
            connectionPush.publish(message.uuid, { msg: "Traiter uuid: " + message.uuid }, function (param1, param2) {
                console.log("param1 : " + param1);
                console.log("param2 : " + param1);
            });
        });
    });
});
//# sourceMappingURL=server.js.map