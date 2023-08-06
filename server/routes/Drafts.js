import express from 'express';
import auth from "../middleware/auth.js";
import { getDraft } from '../controllers/Draft.js';

const router = express.Router();

router.get('/', getDraft);

export default router;