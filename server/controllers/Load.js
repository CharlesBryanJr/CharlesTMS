import express from 'express';

import { createLoadDB } from './Load_db.js';
import { createLoadTP } from './Load_tp.js';
import { createLoadUAPI } from './Load_uapi.js';

const router = express.Router(); 

export const createLoad = async (req, res) => {
  try {
    const load = req.body;
    const newLoadDb = await createLoadDB(req, res);
    const tp_response = await createLoadTP(req, res);
    // const uapi_response = await createLoadUAPI(req, res);

    const relevantDataFromTPResponse = {
      statusCode: tp_response.statusCode,
      data: tp_response.data,
    };

    // return res.status(201).json({ newLoadDb, tp_response, uapi_response });
    return res.status(201).json({ newLoadDb, tp_response: relevantDataFromTPResponse });

  } catch (error) {
    console.error('Error creating load:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default router;