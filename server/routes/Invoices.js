import express from 'express';
import auth from '../middleware/auth.js';
import { createInvoice } from '../controllers/Invoice.js';
import { getInvoice, getInvoices, getInvoicesBySearch, deleteInvoice } from '../controllers/Invoice_db.js';

const router = express.Router();

router.get('/', getInvoices);
router.get('/search', getInvoicesBySearch);
router.get('/:id', getInvoice);
router.post('/', createInvoice);
router.delete('/:id', deleteInvoice);


export default router;
