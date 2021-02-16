const amqp = require("amqplib");
const { CONNECTION_STRING } = require("./util");

const initialize = async () => {
  const nomeFila = "pedidosFinalizados_fila";
  console.log(`Iniciando publisher ${nomeFila}`);

  const conn = await amqp.connect(CONNECTION_STRING);

  require("./consumer")(conn);
  require("./publisher")(conn);
};

initialize();
