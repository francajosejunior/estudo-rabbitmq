var amqp = require("amqplib");
const { delay, BASE_URL } = require("./util");

let fila = "exemplo_3";
const exchangeName = "Fanout Exemplo 3";

const init = async () => {
  const conn = await amqp.connect(BASE_URL);
  const channel = await conn.createChannel();
  const queue = await channel.assertQueue("", {
    durable: false,
    exclusive: true,
  });

  fila = queue.queue;
  await channel.bindQueue(fila, exchangeName, "");

  const consume = await channel.consume(fila, (message) => {
    console.log(message.content.toString(), `(Recived)`);
  });

  console.log(`Iniciando consumer ${fila}`);
};

init();
