import express from 'express';
import Carrier_tp from "../models/Carrier_tp.js";

const router = express.Router(); 

export const createCarrierDB = async (req, res) => {
  try {
    const carrier = req.body;
    const newCarrier = new Carrier_tp({ ...carrier, createdAt: new Date().toISOString() });
    await newCarrier.save();
    console.log('createCarrierDB', newCarrier);
    return newCarrier; // Resolve the promise with the created carrier

  } catch (error) {
    throw error; // Reject the promise with the caught error
  }
};

export const getCarriers = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 100;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Carrier_tp.countDocuments({});
    const carriers = await Carrier_tp.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.json({ data: carriers, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carriers from the database.", details: error.message });
  }
};

export const getCarriersBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const name = new RegExp(searchQuery, "i");

        const carriers = await Carrier_tp.find({ $or: [{ name }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: carriers });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getCarriersByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const carriers = await Carrier_tp.find({ name });

        res.json({ data: carriers });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getCarrier = async (req, res) => {
    const { id } = req.params;

    try {
        const carrier = await Carrier_tp.findById(id);

        res.status(200).json(carrier);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteCarrier = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No carrier with id: ${id}`);

    await Carrier_tp.findByIdAndRemove(id);

    res.json({ message: "Carrier deleted successfully." });
};

export default router;