const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["pkc-lq8v7.eu-central-1.aws.confluent.cloud:9092"],
  ssl: true,
  sasl: {
    mechanism: "plain", // PLAIN
    username: "USER_INFO",
    password: "your_password", // Replace with your actual password
  },
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  await producer.send({
    topic: "kafka-test",
    messages: [{ value: "Hello , this is  message from producer!" }],
  });

  await producer.disconnect();
};

run().catch(console.error);
