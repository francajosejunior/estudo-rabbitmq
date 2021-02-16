const amqp = require("amqplib");
const { CONNECTION_STRING, delay } = require("./util");

module.exports = function (conn) {
  const nomeFila = "pedidosFinalizados_fila";

  const initialize = async () => {
    console.log(`Iniciando publisher ${nomeFila}`);

    const canal = await conn.createChannel();

    const fila = await canal.assertQueue(nomeFila);

    for (let index = 0; index < Infinity; index++) {
      const pedido = {
        cliente: "José " + index,
        valor: 50 + index,
        itens: [{ idItem: 155, qtde: 1 }],
      };

      // espera 2 segundos
      await delay(2000);
      const enviadoParaFila = canal.sendToQueue(
        nomeFila,
        Buffer.from(JSON.stringify(pedido))
      );

      if (enviadoParaFila) {
        console.log(`Pedido do ${pedido.cliente} emviado com sucesso`);
      } else {
        console.error("deu ruim");
      }
    }
  };

  initialize();
};
