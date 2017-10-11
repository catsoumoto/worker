import * as amqplib from "amqplib"

export class Send {
    public rabConnection: any;

    constructor() {
        this.rabConnection = amqplib.connect('amqp://fravaud:BBjakmlc100489@rabbitserver');
    }

    public sendMsg(routingkey, msg) {
        return new Promise((resolve, reject) => {
            this.rabConnection
                .then((conn) => conn.createChannel())
                .then((ch) => {
                    return ch.assertQueue(routingkey)
                        .then((ok) => ch.sendToQueue(routingkey, {msg}));
                }).catch((err) => console.warn(err));

/*
            this.rabConnection.publish(routingkey, {msg}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Worker Send msg:" + JSON.stringify({msg}));
                    resolve();
                }
            });*/
        });
    }
}