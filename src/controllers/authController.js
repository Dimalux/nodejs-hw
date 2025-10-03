// src/controllers/authController.js

import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Перевіряємо, чи існує користувач з таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(409, 'Email in use'));
    }

    // Створюємо нового користувача
    const newUser = new User({
      email,
      password, // Поки що зберігаємо пароль у відкритому вигляді
    });

    // Зберігаємо користувача в базу даних
    await newUser.save();

    // Відправляємо відповідь без пароля (завдяки методу toJSON в моделі)
    res.status(201).json({
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Шукаємо користувача за email
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(401, 'Email or password is wrong'));
    }

    // Перевіряємо пароль (поки що проста перевірка)
    if (user.password !== password) {
      return next(createHttpError(401, 'Email or password is wrong'));
    }

    // Відправляємо відповідь з даними користувача
    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    // Поки що повертаємо заглушку
    // Пізніше додамо автентифікацію через middleware
    res.json({
      message: 'Current user endpoint - to be implemented with authentication',
    });
  } catch (error) {
    next(error);
  }
};
