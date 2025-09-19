// src/server.js :


// Обов'язково на початку файлу!
// Підвантажує змінні з .env файлу
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

const app = express();


// Тепер змінні доступні через process.env
// Отримуємо порт з змінної оточення або використовуємо 3030 за замовчуванням
const PORT = process.env.PORT ?? 3000;


// Перший маршрут
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
});


// Логування часу
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});


// Middleware для парсингу JSON
app.use(express.json());


app.use(cors()); // Дозволяє запити з будь-яких джерел

app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);




app.post('/users', (req, res) => {
  console.log(req.body); // тепер тіло доступне як JS-об’єкт
  res.status(201).json({ message: 'User created' });
});


// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок (останнє)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
});



// Перший маршрут
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
});






// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});