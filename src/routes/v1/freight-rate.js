import express from 'express';
import { upload } from '../../utils/rateFileUpload';
import { uploadFile } from '../../controllers/frController';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

export default router;
