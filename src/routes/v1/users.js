import express from 'express';
import auth from '../../middlewares/auth';
import { getMe } from '../../controllers/user';

const routers = express.Router();

routers.get('/me', auth, getMe);

export default routers;
