import * as amqp from "amqp";

export class Send {
    public rabConnection: any;
    public exchange: any

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

        this.rabConnection.exchange('my-exchange', function(exchange) {
            console.log('Exchange create');
            this.exchange = exchange;
        });
    }

    public sendMsg(routingkey, msg) {
        return new Promise((resolve, reject) => {
            this.exchange.publish(routingkey, {msg}, { immediate: true }, (param1, param2) => {
                if (param1) {
                    reject(param1);
                } else {
                    console.log("Worker Send msg:" + JSON.stringify({msg}));
                    console.log("param1 : " + param1);
                    console.log("param2 : " + param2);
                    resolve();
                }
            });
        });
    }
}