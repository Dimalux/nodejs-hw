// src/validations/notesValidation.js

import { Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

// Кастомна валідація для ObjectId
const objectIdValidation = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

// Схема для валідації параметрів запиту для GET /notes
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1',
    }),
    perPage: Joi.number().integer().min(5).max(20).default(10).messages({
      'number.base': 'PerPage must be a number',
      'number.integer': 'PerPage must be an integer',
      'number.min': 'PerPage must be at least 5',
      'number.max': 'PerPage must be at most 20',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'any.only': 'Tag must be one of the allowed values',
      }),
    search: Joi.string().allow('').messages({
      'string.base': 'Search must be a string',
    }),
  }),
};

// Схема для валідації параметра noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom(objectIdValidation, 'ObjectId validation')
      .required()
      .messages({
        'string.base': 'Note ID must be a string',
        'any.invalid': 'Note ID must be a valid ObjectId',
        'any.required': 'Note ID is required',
      }),
  }),
};

// Схема для валідації тіла запиту для POST /notes
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must not be empty',
      'any.required': 'Title is required',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .required()
      .messages({
        'any.only': 'Tag must be one of the allowed values',
        'any.required': 'Tag is required',
      }),
  }),
};

// Схема для валідації тіла запиту для PATCH /notes/:noteId
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom(objectIdValidation, 'ObjectId validation')
      .required()
      .messages({
        'string.base': 'Note ID must be a string',
        'any.invalid': 'Note ID must be a valid ObjectId',
        'any.required': 'Note ID is required',
      }),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must not be empty',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'any.only': 'Tag must be one of the allowed values',
      }),
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided for update',
    }),
};
