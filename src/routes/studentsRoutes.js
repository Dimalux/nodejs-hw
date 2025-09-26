// src/routes/studentsRoutes.js

import { Router } from 'express';
// import { Student } from '../models/student.js';
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent
} from '../controllers/studentsController.js';


const router = Router();



// router.get('/students', async (req, res) => {
//   const students = await Student.find();
//   res.status(200).json(students);
// });

router.get('/students', getStudents);




// router.get('/students/:studentId', async (req, res) => {
//   const { studentId } = req.params;
//   const student = await Student.findById(studentId);
//   if (!student) {
//     return res.status(404).json({ message: 'Student not found' });
//   }
//   res.status(200).json(student);
// });

router.get('/students/:studentId', getStudentById);

router.post('/students', createStudent);

router.delete('/students/:studentId', deleteStudent);

router.patch('/students/:studentId', updateStudent);


export default router;

