// src/controllers/studentsController.js

import { Student } from '../models/student.js';
import createHttpError from 'http-errors';




// Отримати список усіх студентів
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
};

// Отримати одного студента за id
// Додаємо третій параметр next до контролера
export const getStudentById = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);

  // Код що був до цього
  //  if (!student) {
  //    return res.status(404).json({ message: 'Student not found' });
  //  }

  // Додаємо базову обробку помилки замість res.status(404)
  // if (!student) {
  //   next(new Error('Student not found'));
  //   return;
  // }

  // У контролері використовуємо функцію createHttpError
    if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }





  res.status(200).json(student);
};


export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};


export const deleteStudent = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndDelete({
    _id: studentId,
  });

  if (!student) {
    next(createHttpError(404, "Student not found"));
    return;
  }

  res.status(200).send(student);
};




export const updateStudent = async (req, res, next) => {
  const { studentId } = req.params;

  const student = await Student.findOneAndUpdate(
    { _id: studentId }, // Шукаємо по id
    req.body,
    { new: true }, // повертаємо оновлений документ
  );

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(200).json(student);
};
