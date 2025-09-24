// src/server.js


// // Обов'язково на початку файлу!
// // Підвантажує змінні з .env файлу
import dotenv from 'dotenv';
dotenv.config();

// або другий більш сучасний і елегантний:
// import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { connectMongoDB } from './db/connectMongoDB.js';



const app = express();


// // Тепер змінні доступні через process.env
// // Отримуємо порт з змінної оточення або використовуємо 3030 за замовчуванням
const PORT = process.env.PORT || 3030;


// Middleware

// Дозволяє запити з будь-яких джерел
app.use(cors());
app.use(express.json());
app.use(pino({
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
}));


// Перший маршрут
app.get('/notes', (req, res) => {
    res.status(200).json({ message: 'Retrieved all notes' });
});

// Другий маршрут
app.get('/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

// Третій маршрут
app.get('/test-error', () => {
    throw new Error('Simulated server error');
});


// підключення до MongoDB
await connectMongoDB();



// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message });
});



// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
