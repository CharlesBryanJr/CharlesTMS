import express from 'express';
import * as tp_api from '../api/tp_api.js';

const router = express.Router();

export const createInvoiceTP = async (req, res) => {
  try {
    const invoice = req.body;    
    const tp_response = await tp_api.createInvoice_tp(invoice);
    console.log('TP Response:', tp_response);
    return tp_response; // Resolve the promise with the TP response

  } catch (error) {
    throw error; // Reject the promise with the caught error
  }
};

export default router;