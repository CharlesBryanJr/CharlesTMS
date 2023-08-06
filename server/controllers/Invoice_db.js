import express from 'express';
import Invoice_tp from "../models/Invoice_tp.js";

const router = express.Router();

export const createInvoiceDB = async (req, res) => {
  try {
    const invoice = req.body;
    const newInvoice = new Invoice_tp({ ...invoice, createdAt: new Date().toISOString() });
    await newInvoice.save();
    console.log('createInvoiceDB:', newInvoice);
    return newInvoice; // Resolve the promise with the created invoice

  } catch (error) {
    throw error; // Reject the promise with the caught error
  }
};

export const getInvoices = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 100;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Invoice_tp.countDocuments({});
    const invoices = await Invoice_tp.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: invoices, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carriers from the database.", details: error.message });
  }
};

export const getInvoicesBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const name = new RegExp(searchQuery, "i");

    const invoices = await Invoice_tp.find({ $or: [{ name }, { tags: { $in: tags.split(',') } }] });

    res.json({ data: invoices });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice_tp.findById(id);

    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No invoice with id: ${id}`);

  await Invoice_tp.findByIdAndRemove(id);

  res.json({ message: "Invoice deleted successfully." });
};

export default router;