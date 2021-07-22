//rabbitmq-server start
var amqp = require("amqplib");
const { BASE_URL } = require("./util");

const sendToQueue = (q, msg) => {
  return amqp
    .connect(BASE_URL)
    .then(function (conn) {
      return conn
        .createChannel()
        .then(function (ch) {
          var ok = ch.assertQueue(q, { durable: false });

          return ok.then(function (_qok) {
            // NB: `sentToQueue` and `publish` both return a boolean
            // indicating whether it's OK to send again straight away, or
            // (when `false`) that you should wait for the event `'drain'`
            // to fire before writing again. We're just doing the one write,
            // so we'll ignore it.
            ch.sendToQueue(q, Buffer.from(msg), {
              persistent: true,
            });

            return ch.close();
          });
        })
        .finally(function () {
          conn.close();
        });
    })
    .catch(console.warn);
};

const consumeQueue = (q, noAck = true, callback) => {
  return amqp
    .connect(BASE_URL)
    .then(function (conn) {
      // process.once("SIGINT", function () {
      //   conn.close();
      // });
      return conn.createChannel().then(function (channel) {
        var ok = channel.assertQueue(q, { durable: false });

        ok = ok.then(function (_qok) {
          return channel.consume(q, (message) => callback(message, channel), {
            noAck,
          });
        });

        return ok.then(function (_consumeOk) {
          console.log(" [*] Waiting for messages. To exit press CTRL+C");
        });
      });
    })
    .catch(console.warn);
};

const getChannelAsync = () => {
  return amqp
    .connect(BASE_URL)
    .then(function (conn) {
      return conn.createChannel();
    })
    .catch(console.warn);
};

module.exports = {
  sendToQueue,
  consumeQueue,
  getChannelAsync,
};
