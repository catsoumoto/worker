"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqplib = require("amqplib");
var send_1 = require("./send");
var rabConnection = amqplib.connect('amqp://fravaud:BBjakmlc100489@rabbitserver');
var send = new send_1.Send();
rabConnection
    .then(function (conn) { return conn.createChannel(); })
    .then(function (ch) {
    return ch.assertQueue('worker')
        .then(function (ok) { return ch.consume('worker', function (msg) {
        if (msg !== null) {
            console.log("Worker Receive msg:" + JSON.stringify(msg));
            send.sendMsg(msg.uuid, "Traiter uuid: " + msg.uuid)
                .then(function () { return console.log("send"); })
                .catch(function (err) { return console.log(err); });
            ch.ack(msg);
        }
    }); });
}).catch(function (err) { return console.warn(err); });
/*
// Wait for connection to become established.
connectionGet.on('ready', function () {
    console.log('Connect to (rabbitserver) connectionGet');
    // Use the default 'amq.topic' exchange
    connectionGet.queue('worker', {autoDelete: false}, function (q) {
        // Catch all messages
        q.bind('#');
        
        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log("Worker Receive msg:" + JSON.stringify(message.uuid));
            send.sendMsg(message.uuid, "Traiter uuid: " + message.uuid)
                .then(() => console.log("send"))
                .catch((err) => console.log(err));
        });
    });
});*/ 
//# sourceMappingURL=server.js.map