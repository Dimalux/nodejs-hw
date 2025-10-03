// src/routes/authRoutes.js

import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const router = Router();

// POST /auth/register - реєстрація нового користувача
router.post('/register', celebrate(registerUserSchema), registerUser);

// POST /auth/login - вхід користувача
router.post('/login', celebrate(loginUserSchema), loginUser);

// GET /auth/current - отримання поточного користувача
router.get('/current', getCurrentUser);

export default router;
