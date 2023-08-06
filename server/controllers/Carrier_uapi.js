import express from 'express';

import Carrier from "../models/Carrier.js";
import AdditionalData from '../models/AdditionalData.js';
import Address from '../models/Address.js';

import { generateRequestHeaders } from '../api/uapi_auth.js';
import * as tp_api from '../api/uapi.js';

const router = express.Router(); 

export const getCarrier = async (req, res) => {
    const { tms_id } = req.params;

    try {
      const carrier = await Carrier.findById(tms_id);
      res.status(200).json(carrier);

    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const getCarriers = async (req, res) => {
  const { page } = req.query;

  try{
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await PostMessage.countDocuments({});
    const carriers = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.json({ data: carriers, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});

  } catch(error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCarriersBySearch = async (req, res) => {
  res.send('getCarriersBySearch');
};

export const createCarrierUAPI = async (req, res) => {
  try {
    const carrier = req.body;
    const headers = generateRequestHeaders(carrier, '/brokers/carriers');
    console.log('Request Headers:', headers);
    console.log('Request Body:', carrier);

    const tp_response = await tp_api.test_request_auth({ headers });
    console.log('TP Response:', tp_response);
    return tp_response; // Resolve the promise with the TP response

  } catch (error) {
    throw error; // Reject the promise with the caught error
  }
};

export const deleteCarrier = async (req, res) => {
  res.send('deleteCarrier');
};

export const fetchCarrier = async (req, res) => {
    res.send('fetchCarrier');
};

export const listCarrier = (req, res) => {
    res.send('listCarrier');
};

export default router;