import * as amqplib from "amqplib"

import { Send } from './send';

let rabConnection = amqplib.connect('amqp://fravaud:BBjakmlc100489@rabbitserver');

let send = new Send();

this.rabConnection
    .then((conn) => conn.createChannel())
    .then((ch) => {
        return ch.assertQueue('worker')
            .then((ok) => ch.consume('worker', (msg) => {
                if (msg !== null) {
                    console.log("Worker Receive msg:" + JSON.stringify(msg));
                    send.sendMsg(msg.uuid, "Traiter uuid: " + msg.uuid)
                        .then(() => console.log("send"))
                        .catch((err) => console.log(err));
                    ch.ack(msg);
                }
            }));
    }).catch((err) => console.warn(err));

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