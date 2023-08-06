import mongoose from 'mongoose';

const InvoiceSchema_tp = mongoose.Schema({
  ExternalInvoiceKey: {
    type: String,
    required: true,
  },
  ExternalPayeeKey: {
    type: String,
    required: true,
  },
  ExternalLoadKey: {
    type: String,
  },
  InvoiceImportedStatusId: {
    type: Number,
    required: true,
  },
  InvoiceNo: {
    type: String,
    required: true,
  },
  ReferenceNo: {
    type: String,
    required: true,
  },
  GrossAmount: {
    type: Number,
  },
  PayorAdjustmentAmount: {
    type: Number,
  },
  NetAmount: {
    type: Number,
    required: true,
  },
  DueDate: {
    type: Date,
    required: true,
  },
  ApprovedDate: {
    type: Date,
    required: true,
  },
  Term: {
    type: String,
  },
  StatusNote: {
    type: String,
  },
  Division: {
    type: String,
  },
  LineItems: [
    {
      Amount: {
        type: Number,
      },
      Description: {
        type: String,
      },
    },
  ],
  AdditionalData: [
    {
      Field: {
        type: String,
      },
      Value: {
        type: String,
      },
      Type: {
        type: Number,
      },
    },
  ],
});

var Invoice_tp = mongoose.model('tp_invoice', InvoiceSchema_tp);

export default Invoice_tp;