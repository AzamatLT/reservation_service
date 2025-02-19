import { SchemaRegistry, SCHEMA_TYPE_STRING, Writer } from 'k6/x/kafka';

// Настройки Kafka
const brokers = ["localhost:9092"];
const topic = "out-topic"; // Топик для отправки сообщений

// Создаём Writer для записи сообщений
const writer = new Writer({
  brokers: brokers,
  topic: topic,
});

const schemaRegistry = new SchemaRegistry();

export default function () {
  // JSON-сообщение
  const message = {
      value: schemaRegistry.serialize({
        data: JSON.stringify({
            "name": Math.floor(Math.random() * 1000000)
  }),
  schemaType: SCHEMA_TYPE_STRING,
})
};
//   const key = {
//     name: `key-${__VU}`,
//   };
//   const header = {
//     name: Math.floor(Math.random() * 1000000),
//   };

  // Отправляем сообщение в Kafka
  writer.produce({
    messages: [message]  });

  console.log("Message sent to Kafka:");
//   console.log(`Key: key-${__VU}`);
  console.log(`Value: ${JSON.stringify(message)}`);
//   console.log(`Headers: {"header-key": `Math.floor(Math.random() * 1000000)`}`);
}

export function teardown() {
  // Закрываем Writer
  writer.close();
}