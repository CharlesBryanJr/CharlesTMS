import express from 'express';
import Invoice from "../models/Invoice.js";

import { generateRequestHeaders } from '../api/uapi_auth.js';
import * as tp_api from '../api/uapi.js';

const router = express.Router();

export const getInvoice = async (req, res) => {
  const { tms_id } = req.params;

  try {
    const invoice = await Invoice.findById(tms_id); // Use the Invoice model instead of Carrier model
    res.status(200).json(invoice);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInvoices = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Invoice.countDocuments({});
    const invoices = await Invoice.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.json({ data: invoices, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInvoicesBySearch = async (req, res) => {
  res.send('getInvoicesBySearch');
};

export const createInvoiceUAPI = async (req, res) => {
  try {
    const invoice = req.body;
    const headers = generateRequestHeaders(invoice, '/brokers/invoices');
    console.log('Request Headers:', headers);
    console.log('Request Body:', invoice);

    const tp_response = await tp_api.test_request_auth({ headers });
    console.log('TP Response:', tp_response);
    return tp_response; // Resolve the promise with the TP response

  } catch (error) {
    throw error; // Reject the promise with the caught error
  }
};

export const deleteInvoice = async (req, res) => {
  res.send('deleteInvoice');
};

export const fetchInvoice = async (req, res) => {
  res.send('fetchInvoice');
};

export const listInvoice = (req, res) => {
  res.send('listInvoice');
};

export default router;