import { Reader, Writer } from 'k6/x/kafka';

// Настройки Kafka
const brokers = ["localhost:9092"];
const outTopic = "out-topic"; // Топик для чтения
const intoTopic = "into-topic"; // Топик для записи
const groupID = "k6-consumer-group"; // Идентификатор группы потребителей

// Создаём Reader для чтения сообщений
const reader = new Reader({
  brokers: brokers,
  groupTopics: [outTopic], // Указываем топики для группы потребителей
  groupID: groupID,
});

// Создаём Writer для записи сообщений
const writer = new Writer({
  brokers: brokers,
  topic: intoTopic,
});

export default function () {
  // Чтение сообщений (максимум 1 сообщение за раз)
  const messages = reader.consume({ limit: 1 });

  // Если сообщения есть, обрабатываем их
  if (messages.length > 0) {
    const message = messages[0];

    // Выводим сообщение в консоль для отладки
    console.log(`Received message: Key=${message.key}, Value=${message.value}`);

    // Отправляем сообщение в другой топик
    writer.produce({
      messages: [
        {
          key: message.key,
          value: message.value,
        },
      ],
    });

    console.log(`Sent message to ${intoTopic}: Key=${message.key}, Value=${message.value}`);
  } else {
    console.log("No messages to process.");
  }
}

export function teardown() {
  // Закрываем Reader и Writer
  reader.close();
  writer.close();
}