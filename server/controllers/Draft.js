import express from 'express';

import { createDraftDB } from './Draft_db.js';
import { getDraft_tp } from './Draft_tp.js';

export const getDraft = async (req, res) => {
  try {
    const { draftDateFrom, draftDateTo } = req.query;

    const tp_response = await getDraft_tp(req, res);
    const newDraft_db = await createDraftDB(tp_response);
    console.log('tp_response', tp_response);
    console.log('newDraft_db', newDraft_db);

    const relevantDataFromTPResponse = {
      statusCode: tp_response.statusCode,
      data: tp_response.data,
    };

    return res.status(201).json({ newDraft_db, tp_response: relevantDataFromTPResponse });
    // return res.status(201).json({ relevantDataFromTPResponse });

  } catch (error) {
    console.error('Error creating carrier:', error);
    return res.status(500).json({ message: 'Internal Server Error' });  }
};