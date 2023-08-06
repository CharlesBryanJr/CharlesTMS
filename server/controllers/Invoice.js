import express from 'express';
import mongoose from 'mongoose';

import { createInvoiceDB } from './Invoice_db.js';
import { createInvoiceTP } from './Invoice_tp.js';
import { createInvoiceUAPI } from './Invoice_uapi.js';

const router = express.Router();

export const createInvoice = async (req, res) => {
  try {
    const invoice = req.body;
    console.log('invoice', invoice);
    const newInvoiceDb = await createInvoiceDB(req, res);
    const tp_response = await createInvoiceTP(req, res);
    // const uapi_response = await createInvoiceUAPI(req, res);

    console.log('createInvoice_db', newInvoiceDb);
    console.log('tp_response', tp_response);
    // console.log('uapi_response', uapi_response);
    
    const relevantDataFromTPResponse = {
      statusCode: tp_response.statusCode,
      data: tp_response.data,
    };
    
    // return res.status(201).json({ newInvoiceDb, tp_response, uapi_response });
    return res.status(201).json({ newInvoiceDb, tp_response: relevantDataFromTPResponse });

  } catch (error) {
    console.error('Error creating invoice:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default router;