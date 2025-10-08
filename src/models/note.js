// src/models/note.js

import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
       trim: true,
      required: true,
    },
    content: {
      type: String,
       trim: true,
      default: '',
    },
    tag: {
      type: String,
      enum: TAGS, // використовуємо константи з tags.js
      default: 'Todo',
    },

    // Встановлюємо звязок між колекціями: кожен нотатка належить певному користувачу.
userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('Note', noteSchema);
