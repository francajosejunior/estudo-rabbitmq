const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

module.exports = {
  delay,
  BASE_URL: "amqp://localhost",
};
