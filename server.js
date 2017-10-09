"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require("amqp");
var send_1 = require("./send");
var connectionGet = amqp.createConnection({
    host: 'rabbitserver',
    login: 'fravaud',
    password: 'BBjakmlc100489'
});
// add this for better debuging
connectionGet.on('error', function (e) {
    console.log("Error from amqp: ", e);
});
var send = new send_1.Send();
// Wait for connection to become established.
connectionGet.on('ready', function () {
    console.log('Connect to (rabbitserver) connectionGet');
    // Use the default 'amq.topic' exchange
    connectionGet.queue('worker', { autoDelete: false }, function (q) {
        // Catch all messages
        q.bind('#');
        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log("Worker Receive msg:" + JSON.stringify(message.uuid));
            send.sendMsg(message.uuid, "Traiter uuid: " + message.uuid)
                .then(function () { return console.log("send"); })
                .catch(function (err) { return console.log(err); });
        });
    });
});
//# sourceMappingURL=server.js.map