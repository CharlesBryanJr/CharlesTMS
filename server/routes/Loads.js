import express from 'express';
import auth from '../middleware/auth.js';
import { createLoad } from '../controllers/Load.js';
import { getLoad, getLoads, getLoadsBySearch, deleteLoad } from '../controllers/Load_db.js';

const router = express.Router();

// Loads routes
router.get('/', getLoads);
router.get('/search', getLoadsBySearch);
router.get('/:id', getLoad);
router.post('/', createLoad);
router.delete('/:id', auth, deleteLoad);

export default router;
