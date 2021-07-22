var amqp = require("amqplib");
const { delay, BASE_URL } = require("./util");

const fila = "";
const exchangeName = "Fanout Exemplo 3";
const init = async () => {
  console.log(`Iniciando sender ${fila}`);

  const conn = await amqp.connect(BASE_URL);
  const channel = await conn.createChannel();

  const exchange = await channel.assertExchange(exchangeName, "fanout", {
    durable: false,
  });

  for (let i = 0; i < Infinity; i++) {
    await delay(3000);
    const message = `${i + 1} - Exchange ${exchangeName}`;
    const sended = channel.publish(exchangeName, "", Buffer.from(message));

    if (sended) console.log(`${message} (OK)`);
    else console.error(`${message} (ERROR)`);
  }

  channel.close();
  conn.close();
};

init();
