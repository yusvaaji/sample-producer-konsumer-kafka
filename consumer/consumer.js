const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["pkc-lq8v7.eu-central-1.aws.confluent.cloud:9092"],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: "USER_INFO",
    password: "your_password", // Replace with your actual password
  },
});

const consumer = kafka.consumer({
  groupId: "web-9320bd3d-1008-4d6f-a647-eee78761e91b",
});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "kafka-test", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
