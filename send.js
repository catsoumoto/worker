"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require("amqp");
var Send = /** @class */ (function () {
    function Send() {
        this.rabConnection = amqp.createConnection({
            host: 'rabbitserver',
            login: 'fravaud',
            password: 'BBjakmlc100489'
        });
        // add this for better debuging
        this.rabConnection.on('error', function (e) {
            console.log("Error from amqp: ", e);
        });
        this.rabConnection.on('ready', function () {
            console.log('Connect to (rabbitserver) connectionPush');
        });
    }
    Send.prototype.sendMsg = function (routingkey, msg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rabConnection.publish(routingkey, { msg: msg }, { persistent: true }, function (param1, param2) {
                if (param1) {
                    reject(param1);
                }
                else {
                    console.log("Worker Send msg:" + JSON.stringify({ msg: msg }));
                    console.log("param1 : " + param1);
                    console.log("param2 : " + param2);
                    resolve();
                }
            });
        });
    };
    return Send;
}());
exports.Send = Send;
//# sourceMappingURL=send.js.map