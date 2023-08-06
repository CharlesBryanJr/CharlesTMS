import express from 'express';
import Load_tp from "../models/Load_tp.js";

const router = express.Router();

export const createLoadDB = async (req, res) => {
  try {
    const load = req.body;
    const newLoad = new Load_tp({ ...load, createdAt: new Date().toISOString() });
    await newLoad.save();
    console.log('Saved Load:', newLoad);
    return newLoad; // Resolve the promise with the created load

  } catch (error) {
    throw error; // Reject the promise with the caught error
  }
};


export const getLoads = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 100;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Load_tp.countDocuments({});
    const loads = await Load_tp.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    res.json({ data: loads, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carriers from the database.", details: error.message });
  }
};

export const getLoadsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const name = new RegExp(searchQuery, "i");

    const loads = await Load_tp.find({ $or: [{ name }, { tags: { $in: tags.split(',') } }] });

    res.json({ data: loads });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLoad = async (req, res) => {
  const { id } = req.params;

  try {
    const load = await Load_tp.findById(id);

    res.status(200).json(load);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteLoad = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No load with id: ${id}`);

  await Load_tp.findByIdAndRemove(id);

  res.json({ message: "Load deleted successfully." });
};

export default router;