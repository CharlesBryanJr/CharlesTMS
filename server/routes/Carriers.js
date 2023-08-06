import express from 'express';
import auth from "../middleware/auth.js";
import { createCarrier } from '../controllers/Carrier.js';
import { getCarrier, getCarriers, getCarriersBySearch, deleteCarrier } from '../controllers/Carrier_db.js';

const router = express.Router();

router.get('/', getCarriers);
router.get('/search', getCarriersBySearch);
router.get('/:id', getCarrier);
router.post('/', createCarrier);
router.delete('/:id', deleteCarrier);

export default router;