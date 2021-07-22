var amqp = require("amqplib");
const { delay, BASE_URL } = require("./util");

const fila = "exemplo_1";
const init = async () => {
  const conn = await amqp.connect(BASE_URL);
  const channel = await conn.createChannel();
  const queue = await channel.assertQueue(fila, { durable: false });

  const consumeOpts = {
    noAck: false,
  };

  const consume = await channel.consume(
    fila,
    async (message) => {
      console.log(message.content.toString(), `(Recived)`);
      channel.ack(message);
    },
    consumeOpts
  );

  console.log(`Iniciando consumer ${fila}`);
};

init();
