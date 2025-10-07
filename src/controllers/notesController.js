// src/controllers/notesController.js

import { Note } from '../models/note.js';
import createHttpError from 'http-errors';


// Отримати список усіх нотаток з фільтрацією та пагінацією
export const getAllNotes = async (req, res) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;


 // Створюємо об'єкт для фільтрації
    const filter = { userId: req.user._id }; // Додаємо критерій пошуку тільки нотаток поточного користувача


  // Додаємо фільтр за тегом, якщо він переданий
  if (tag) {
    filter.tag = tag;
  }

  // Додаємо фільтр за пошуком, якщо він переданий
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } }, // пошук у title (case insensitive)
      { content: { $regex: search, $options: 'i' } }, // пошук у content (case insensitive)
    ];
  }

  // Перетворюємо параметри пагінації в числа
  const currentPage = parseInt(page);
  const itemsPerPage = parseInt(perPage);

  // Обчислюємо скіп для пагінації
  const skip = (currentPage - 1) * itemsPerPage;

  // Виконуємо запит з пагінацією
  const [notes, totalNotes] = await Promise.all([
    Note.find(filter).skip(skip).limit(itemsPerPage),
    Note.countDocuments(filter),
  ]);

  // Обчислюємо загальну кількість сторінок
  const totalPages = Math.ceil(totalNotes / itemsPerPage);

  // Формуємо відповідь згідно з вимогами завдання
  res.status(200).json({
    page: currentPage,
    perPage: itemsPerPage,
    totalNotes,
    totalPages,
    notes,
  });
};

 // Отримати одну нотатку за id
export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;

  // Шукаємо нотатку за id і перевіряємо, що вона належить поточному користувачу
  const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id
  });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};


export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
     // Додаємо властивість userId
    userId: req.user._id});
  res.status(201).json(note);
};


export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;

  // Видаляємо тільки нотатку, яка належить поточному користувачу
  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id
  });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};


export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  // Оновлюємо тільки нотатку, яка належить поточному користувачу
  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      userId: req.user._id
    }, // Критерій пошуку: id нотатки + userId власника
    req.body,
    { new: true } // повертаємо оновлений документ
  );

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};






