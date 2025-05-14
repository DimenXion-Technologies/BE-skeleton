import express from 'express';
import auth from '../../middlewares/auth.js';
import { getMe } from '../../controllers/user.js';

const routers = express.Router();

routers.get('/me', auth, getMe);

export default routers;
