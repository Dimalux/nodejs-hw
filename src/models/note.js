// src/models/note.js

// import { Schema } from 'mongoose';
// import { model } from 'mongoose';

// const noteSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     content: {
//       type: String,
//       default: '',
//     },
//     tag: {
//       type: String,
//       enum: [
//         'Work',
//         'Personal',
//         'Meeting',
//         'Shopping',
//         'Ideas',
//         'Travel',
//         'Finance',
//         'Health',
//         'Important',
//         'Todo',
//       ],
//       default: 'Todo',
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );

// export const Note = model('Note', noteSchema);





// src/models/note.js

import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      enum: TAGS, // використовуємо константи з tags.js
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('Note', noteSchema);
