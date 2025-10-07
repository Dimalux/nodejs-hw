// src/routes/authRoutes.js


import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';



const router = Router();

// POST /auth/register - реєстрація нового користувача
router.post('/auth/register', celebrate(registerUserSchema), registerUser);



// POST /auth/login - вхід користувача
router.post('/auth/login', celebrate(loginUserSchema), loginUser);


// POST /auth/logout - вихід користувача з системи
router.post('/auth/logout', logoutUser);


 // POST /auth/refresh - cтворення нової сесії
router.post('/auth/refresh', refreshUserSession);

export default router;
