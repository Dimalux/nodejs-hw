// src/controllers/notesController.js

import { Note } from '../models/note.js';
import createHttpError from 'http-errors';


// // Отримати список усіх нотаток з фільтрацією
// export const getAllNotes = async (req, res) => {
//   const { tag, search } = req.query;

//   // Створюємо об'єкт для фільтрації
//   const filter = {};

//   // Додаємо фільтр за тегом, якщо він переданий
//   if (tag) {
//     filter.tag = tag;
//   }

//   // Додаємо фільтр за пошуком, якщо він переданий
//   if (search) {
//     filter.$or = [
//       { title: { $regex: search, $options: 'i' } }, // пошук у title (case insensitive)
//       { content: { $regex: search, $options: 'i' } } // пошук у content (case insensitive)
//     ];
//   }

//   const notes = await Note.find(filter);

//   // Відповідь має бути у форматі { notes: [...] } згідно завдання
//   res.status(200).json({ notes });
// };





// Отримати список усіх нотаток з фільтрацією та пагінацією
export const getAllNotes = async (req, res) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;

  // Створюємо об'єкт для фільтрації
  const filter = {};

  // Додаємо фільтр за тегом, якщо він переданий
  if (tag) {
    filter.tag = tag;
  }

  // Додаємо фільтр за пошуком, якщо він переданий
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } }, // пошук у title (case insensitive)
      { content: { $regex: search, $options: 'i' } } // пошук у content (case insensitive)
    ];
  }

  // Перетворюємо параметри пагінації в числа
  const currentPage = parseInt(page);
  const itemsPerPage = parseInt(perPage);

  // Обчислюємо скіп для пагінації
  const skip = (currentPage - 1) * itemsPerPage;

  // Виконуємо запит з пагінацією
  const [notes, totalNotes] = await Promise.all([
    Note.find(filter)
      .skip(skip)
      .limit(itemsPerPage),
    Note.countDocuments(filter)
  ]);

  // Обчислюємо загальну кількість сторінок
  const totalPages = Math.ceil(totalNotes / itemsPerPage);

  // Формуємо відповідь згідно з вимогами завдання
  res.status(200).json({
    page: currentPage,
    perPage: itemsPerPage,
    totalNotes,
    totalPages,
    notes
  });
};









// Отримати одну нотатку за id
// Додаємо третій параметр next до контролера
export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  // У контролері використовуємо функцію createHttpError
  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).send(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId }, // Шукаємо по id
    req.body,
    { new: true }, // повертаємо оновлений документ
  );

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};
