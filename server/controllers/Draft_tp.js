import express from 'express';

import Draft_tp from "../models/Draft_tp.js";
import * as tp_api from '../api/tp_api.js';

export const getDraft_tp = async (req, res) => {
  try {
    const { draftDateFrom, draftDateTo } = req.query;
    const requestBody = {
      DraftDateFrom: req.query.draftDateFrom,
      DraftDateTo: req.query.draftDateTo,
    };
    const tp_response = await tp_api.InvoiceDrafts(requestBody);
    console.log('TP Response:', tp_response);
    return tp_response;

  } catch (error) {
    throw error;
  }
};