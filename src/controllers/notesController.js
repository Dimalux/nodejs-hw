// src/controllers/notesController.js


import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// Отримати список усіх нотаток з фільтрацією та пагінацією
export const getAllNotes = async (req, res) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;

  // Створюємо базовий запит з фільтрацією по userId
  let query = Note.find().where('userId').equals(req.user._id);

  // Додаємо фільтр за тегом, якщо він переданий
  if (tag) {
    query = query.where('tag').equals(tag);
  }

  // Додаємо фільтр за пошуком, якщо він переданий
  if (search) {
    query = query.or([
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ]);
  }

  // Перетворюємо параметри пагінації в числа
  const currentPage = parseInt(page);
  const itemsPerPage = parseInt(perPage);

  // Обчислюємо скіп для пагінації
  const skip = (currentPage - 1) * itemsPerPage;

  // Виконуємо запит з пагінацією
  const [notes, totalNotes] = await Promise.all([
    query.skip(skip).limit(itemsPerPage).exec(),
    Note.countDocuments(query.getFilter()), // Використовуємо getFilter() для отримання фільтрів з query
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
  const note = await Note.findOne()
    .where('_id')
    .equals(noteId)
    .where('userId')
    .equals(req.user._id);

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
    userId: req.user._id
  });
  res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;

  // Видаляємо тільки нотатку, яка належить поточному користувачу
  const note = await Note.findOneAndDelete()
    .where('_id')
    .equals(noteId)
    .where('userId')
    .equals(req.user._id);

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
