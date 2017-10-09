import * as amqp from "amqp";

export class Send {
    public rabConnection: any;

    constructor() {
        this.rabConnection = amqp.createConnection({ 
            host: 'rabbitserver'
            , login: 'fravaud'
            , password: 'BBjakmlc100489' });
        
        // add this for better debuging
        this.rabConnection.on('error', function(e) {
          console.log("Error from amqp: ", e);
        });
        
        this.rabConnection.on('ready', function () {
            console.log('Connect to (rabbitserver) connectionPush');
        });

    }

    public sendMsg(routingkey, msg) {
        return new Promise((resolve, reject) => {
            this.rabConnection.publish(routingkey, {msg}, { immediate: true }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Worker Send msg:" + JSON.stringify({msg}));
                    resolve();
                }
            });
        });
    }
}