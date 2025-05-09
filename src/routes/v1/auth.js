import express from 'express';
import {
  loginValidator,
  refreshTokenValidator,
  registerValidator,
} from '../../validations/auth';
import { login, register } from '../../controllers/authController';

const router = express.Router();

router.post('/register', registerValidator, register);

router.post('/login', loginValidator, login);

router.post('/refresh-token', refreshTokenValidator, (req, res) => {
  res.send('Birds home page');
});

export default router;
