import express from 'express';

import { createCarrierDB } from './Carrier_db.js';
import { createCarrierTP } from './Carrier_tp.js';
import { createCarrierUAPI } from './Carrier_uapi.js';

const router = express.Router(); 

export const createCarrier = async (req, res) => {
  try {
    const carrier = req.body;
    const newCarrierDb = await createCarrierDB(req, res);
    const tp_response = await createCarrierTP(req, res);
    // const uapi_response = await createCarrierUAPI(req, res);

    console.log('createCarrier_db', newCarrierDb);
    console.log('tp_response', tp_response);
    // console.log('uapi_response', uapi_response);

    const relevantDataFromTPResponse = {
      statusCode: tp_response.statusCode,
      data: tp_response.data,
    };
    
    // return res.status(201).json({ newCarrierDb, tp_response, uapi_response });
    return res.status(201).json({ newCarrierDb, tp_response: relevantDataFromTPResponse });

  } catch (error) {
    console.error('Error creating carrier:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default router;