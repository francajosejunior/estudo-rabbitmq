const amqp = require("amqplib");
const { CONNECTION_STRING, delay } = require("./util");

module.exports = function (conn) {
  const nomeFila = "pedidosFinalizados_fila";

  const initialize = async () => {
    const canal = await conn.createChannel();

    // const fila = await canal.assertQueue(nomeFila);

    await canal.consume(nomeFila, function (message) {
      console.log(message.content.toString(), "(Mensagem recebida)");
    });

    console.log(`Iniciando consumer ${nomeFila}`);
  };

  initialize();
};
