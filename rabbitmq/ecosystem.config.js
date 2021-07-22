module.exports = {
  apps: [
    {
      name: "1_receiver",
      script: "./1_receiver.js",
      restart_delay: 1000,
      watch: true,
      env: {},
    },
    {
      name: "1_sender",
      script: "./1_sender.js",
      restart_delay: 1000,
      watch: true,
      env: {},
    },
    {
      name: "3_receiver",
      script: "./3_receiver.js",
      restart_delay: 1000,
      watch: true,
      env: {},
    },
    {
      name: "3_receiver (2)",
      script: "./3_receiver.js",
      restart_delay: 1000,
      watch: true,
      env: {},
    },
    {
      name: "3_sender",
      script: "./3_sender.js",
      restart_delay: 1000,
      watch: true,
      env: {},
    },
  ],
};
