import express from 'express';

import Draft_tp from "../models/Draft_tp.js";

// Controller function to handle the GET request for fetching draft data
export const createDraftDB = async (tp_response) => {
  try {
    console.log(tp_response);
    const newDraft = new Draft_tp({ ...tp_response, createdAt: new Date().toISOString() });
    console.log('createDraftDB', tp_response);
    // return res.status(200).json(newCarrier);
    return newDraft;

  } catch (error) {
    throw error;
  }
};