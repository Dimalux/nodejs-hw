// src/server.js :



// require('dotenv').config(); // Підвантажує змінні з .env файлу
// const express = require('express');

// const app = express();

// // Отримуємо порт з змінної оточення або використовуємо 3030 за замовчуванням
// const PORT = process.env.PORT || 3030;

// // Базовий маршрут для перевірки
// app.get('/', (req, res) => {
//   res.send(`Сервер працює на порті ${PORT}`);
// });

// // Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Сервер запущено на порті ${PORT}`);
// });



// Обов'язково на початку файлу!
require('dotenv').config();

const express = require('express');
const app = express();

// Тепер змінні доступні через process.env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});