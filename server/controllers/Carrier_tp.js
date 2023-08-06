import express from 'express';

import * as tp_api from '../api/tp_api.js';

const router = express.Router();

export const createCarrierTP = async (req, res) => {
  try {
    const carrier = req.body;    
    const tp_response = await tp_api.createCarrier_tp(carrier);
    console.log('TP Response:', tp_response);
    return tp_response;

  } catch (error) {
    throw error;
  }
};

export default router;

