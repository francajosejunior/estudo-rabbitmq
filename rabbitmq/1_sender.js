var amqp = require("amqplib");
const { delay, BASE_URL } = require("./util");

const fila = "exemplo_1";
const init = async () => {
  console.log(`Iniciando sender ${fila}`);

  const conn = await amqp.connect(BASE_URL);
  const channel = await conn.createChannel();
  const queue = await channel.assertQueue(fila, { durable: false });

  for (let i = 0; i < Infinity; i++) {
    await delay(1000);
    const message = `${i + 1} - Exchange defaut fila ${fila}`;
    const sended = channel.sendToQueue(fila, Buffer.from(message), {
      persistent: true,
    });

    if (sended) console.log(`${message} (OK)`);
    else console.error(`${message} (ERROR)`);
  }

  channel.close();
  conn.close();
};

init();
