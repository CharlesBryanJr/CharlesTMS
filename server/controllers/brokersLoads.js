import express from 'express';
import mongoose from 'mongoose';

import Load from "../models/Load.js";
import LoadReference from "../models/LoadReference.js";
import LoadRemainingCharges from "../models/LoadRemainingCharges.js";
import LoadTotalCharges from "../models/LoadTotalCharges.js";

import EmbeddedStop from "../models/EmbeddedStop.js";
import EmbeddedShippedItem from "../models/EmbeddedShippedItem.js";
import EmbeddedShipment from "../models/EmbeddedShipment.js";

import PartialAddress from "../models/PartialAddress.js";

import VolumeWithUnit from "../models/VolumeWithUnit.js";
import DistanceWithUnit from "../models/DistanceWithUnit.js";
import WeightWithUnit from "../models/WeightWithUnit.js";

import NetworkSubmissionLoadConfig from "../models/NetworkSubmissionLoadConfig.js";
import NetworkSubmissionDocumentType from "../models/NetworkSubmissionDocumentType.js";

const router = express.Router();

export const createLoad = async (req, res) => {
    const load = req.body;
    
    const newLoad = new Load(load);

    try{
        await newLoad.save();
        console.log(newLoad);
        res.status(201).json(newLoad);

    } catch(error){
        handleErrorResponse(res, error);
    }
}

export const fetchLoad = async (req, res) => {
    res.send('fetchLoad');
}

export const listLoads = (req, res) => {
    res.send('listLoads');
}

const handleErrorResponse = (res, error) => {
    if (error.response?.data) {
      const { code, errors, status } = error.response.data;
      console.log('Error Code:', code);
      console.log('Error Message:', errors[0]?.message);
      console.log('Status:', status);
      return res.status(error.response.status).json({ code, errors, status });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default router;