import * as amqp from 'amqp';
import { Send } from './send';

var connectionGet = amqp.createConnection({ 
    host: 'rabbitserver'
    , login: 'fravaud'
    , password: 'BBjakmlc100489' });

// add this for better debuging
connectionGet.on('error', function(e) {
  console.log("Error from amqp: ", e);
});

let send = new Send();
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
            console.log("Worker Receive msg:" + JSON.stringify(message.uuid));
            send.sendMsg(message.uuid, "Traiter uuid: " + message.uuid)
                .then(() => console.log("send"))
                .catch((err) => console.log(err));
        });
    });
});