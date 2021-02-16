const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

module.exports = {
  delay,
  CONNECTION_STRING: "amqp://localhost",
};
