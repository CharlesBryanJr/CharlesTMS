import express from 'express';

import Load from "../models/Load.js";

import { generateRequestHeaders } from '../api/uapi_auth.js';
import * as tp_api from '../api/uapi.js';

const router = express.Router(); 

export const getLoad = async (req, res) => {
    const { tms_id } = req.params;

    try {
      const load = await Load.findById(tms_id);
      res.status(200).json(load);

    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const getLoads = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Load.countDocuments({});
    const loads = await Load.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.json({ data: loads, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLoadsBySearch = async (req, res) => {
  res.send('getLoadsBySearch');
};

export const createLoadUAPI = async (req, res) => {
  try {
    const load = req.body;
    const headers = generateRequestHeaders(load, '/brokers/loads');
    console.log('Request Headers:', headers);
    console.log('Request Body:', load);

    const tp_response = await tp_api.test_request_auth({ headers });
    console.log('TP Response:', tp_response);
    return tp_response; // Resolve the promise with the TP response

  } catch (error) {
    throw error; // Reject the promise with the caught error
  }
};

export const deleteLoad = async (req, res) => {
  res.send('deleteLoad');
};

export const fetchLoad = async (req, res) => {
    res.send('fetchLoad');
};

export const listLoad = (req, res) => {
    res.send('listLoad');
};

export default router;
