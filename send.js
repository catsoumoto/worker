"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqplib = require("amqplib");
var Send = /** @class */ (function () {
    function Send() {
        this.rabConnection = amqplib.connect('amqp://fravaud:BBjakmlc100489@rabbitserver');
    }
    Send.prototype.sendMsg = function (routingkey, msg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rabConnection
                .then(function (conn) { return conn.createChannel(); })
                .then(function (ch) {
                return ch.assertQueue(routingkey)
                    .then(function (ok) { return ch.sendToQueue(routingkey, { msg: msg }); });
            }).catch(function (err) { return console.warn(err); });
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
    };
    return Send;
}());
exports.Send = Send;
//# sourceMappingURL=send.js.map