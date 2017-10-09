import * as amqp from 'amqp';

var connection = amqp.createConnection({ 
    host: 'rabbitserver'
    , login: 'fravaud'
    , password: 'BBjakmlc100489' });

// add this for better debuging
connection.on('error', function(e) {
  console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connection.on('ready', function () {
    console.log('Connect to (rabbitserver)');
    // Use the default 'amq.topic' exchange
    connection.queue('worker', function (q) {
        // Catch all messages
        q.bind('#');
        
        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log("Worker msg:" + JSON.stringify(message.uuid));
            connection.publish({msg: message.uuid}, "Traiter uuid: " + message.uuid);
        });
    });
});