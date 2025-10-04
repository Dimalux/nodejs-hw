// src/server.js

// // Обов'язково на початку файлу!
// // Підвантажує змінні з .env файлу
// import 'dotenv/config';

// import express from 'express';
// import cors from 'cors';

// // Імпортуємо middleware від помилок при невдалій валідації
// import { errors } from "celebrate";

// import { connectMongoDB } from './db/connectMongoDB.js';
// import { logger } from './middleware/logger.js';
// import { notFoundHandler } from './middleware/notFoundHandler.js';
// import { errorHandler } from './middleware/errorHandler.js';
// import notesRoutes from './routes/notesRoutes.js';

// const app = express();

// // Отримуємо порт з змінної оточення або використовуємо 3030 за замовчуванням
// const PORT = process.env.PORT || 3030;

// // Middleware

// // Логер першим — бачить усі запити
// app.use(logger);
// // Дозволяє запити з будь-яких джерел
// app.use(cors());
// app.use(express.json());

// // підключаємо групу маршрутів
// app.use(notesRoutes);

// // Middleware 404 (після всіх маршрутів)
// app.use(notFoundHandler);

// // обробка помилок від celebrate (валідація)
// app.use(errors());

// // Error — якщо під час запиту виникла помилка
// app.use(errorHandler);

// // підключення до MongoDB
// await connectMongoDB();

// // Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






// src/server.js

// Обов'язково на початку файлу!
// Підвантажує змінні з .env файлу
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

// Імпортуємо middleware від помилок при невдалій валідації
import { errors } from "celebrate";

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Отримуємо порт з змінної оточення або використовуємо 3030 за замовчуванням
const PORT = process.env.PORT || 3030;

// Middleware

// Логер першим — бачить усі запити
app.use(logger);
// Дозволяє запити з будь-яких джерел
app.use(cors());
app.use(express.json());

// підключаємо групу маршрутів
app.use(authRoutes); 
app.use(notesRoutes);

// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);

// обробка помилок від celebrate (валідація)
app.use(errors());

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
