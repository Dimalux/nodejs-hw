// src/routes/authRoutes.js


import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
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


// Реалізуємо ендпоінт POST /auth/request-reset-email, який надсилатиме лист із посиланням для скидання пароля.
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);

export default router;
