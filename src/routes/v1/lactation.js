import express from 'express';
import auth from '../../middlewares/auth.js';
import {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} from '../../controllers/lactation/lactaneDonorController.js';
import {
  registerLactaneDonorValidator,
  updateLactaneDonorValidator,
} from '../../validations/lactane.js';

const routers = express.Router();

routers.post('/donor', auth, registerLactaneDonorValidator, createDonor);
routers.get('/donor', auth, getAllDonors);
routers.get('/donor/:id', auth, getDonorById);
routers.put('/donor/:id', auth, updateLactaneDonorValidator, updateDonor);
routers.delete('/donor/:id', auth, deleteDonor);

export default routers;
