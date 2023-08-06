import mongoose from 'mongoose';

const CarrierSchema_tp = mongoose.Schema({
  ExternalPayeeKey: {
    type: String,
    required: true,
  },
  CompanyName: {
    type: String,
    required: true,
  },
  MCNumber: {
    type: String,
    required: true,
  },
  DOTNumber: {
    type: String,
    required: true,
  },
  Scac: {
    type: String,
  },
  Addr1: {
    type: String,
    required: true,
  },
  Addr2: {
    type: String,
  },
  City: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  PostalCode: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  PrimaryContact: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  PrimaryEmail: {
    type: String,
    required: true,
  },
  RemitName: {
    type: String,
    required: true,
  },
  RemitAddr1: {
    type: String,
    required: true,
  },
  RemitAddr2: {
    type: String,
  },
  RemitCity: {
    type: String,
    required: true,
  },
  RemitState: {
    type: String,
    required: true,
  },
  RemitPostalCode: {
    type: String,
    required: true,
  },
  RemitCountry: {
    type: String,
  },
  RelationshipCategory: {
    type: String,
  },
  Division: {
    type: String,
  },
  DefaultPayoutTermCode: {
    type: String,
    required: true,
  },
  DisablePayee: {
    type: Boolean,
    default: false,
  },
  AltPhoneNumbers: [
    {
      type: String,
    },
  ],
  FaxNumber: {
    type: String,
    required: true,
  },
  AltEmails: [
    {
      type: String,
    },
  ],
  IsQuickPayAllowed: {
    type: Boolean,
    default: false,
  },
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
  StatusNote: {
    type: String,
  },
});

var Carrier_tp = mongoose.model('tp_carrier ', CarrierSchema_tp);

export default Carrier_tp;