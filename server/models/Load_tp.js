import mongoose from 'mongoose';

const LoadSchema_tp = mongoose.Schema({
  ExternalLoadKey: {
    type: String,
    required: true,
  },
  ExternalPayeeKey: {
    type: String,
    required: true,
  },
  LoadStatusId: {
    type: Number,
    required: true,
  },
  ReferenceNo: {
    type: String,
    required: true,
  },
  PickupDate: {
    type: Date,
    required: true,
  },
  OriginName: {
    type: String,
    required: true,
  },
  OriginAddress1: {
    type: String,
    required: true,
  },
  OriginAddress2: {
    type: String,
  },
  OriginCity: {
    type: String,
    required: true,
  },
  OriginState: {
    type: String,
    required: true,
  },
  OriginPostalCode: {
    type: String,
    required: true,
  },
  OriginCountry: {
    type: String,
  },
  DeliveryDate: {
    type: Date,
    required: true,
  },
  DestinationConsignee: {
    type: String,
    required: true,
  },
  DestinationAddress1: {
    type: String,
    required: true,
  },
  DestinationAddress2: {
    type: String,
  },
  DestinationCity: {
    type: String,
    required: true,
  },
  DestinationState: {
    type: String,
    required: true,
  },
  DestinationPostalCode: {
    type: String,
    required: true,
  },
  DestinationCountry: {
    type: String,
  },
  Distance: {
    type: Number,
  },
  DistanceUnits: {
    type: Number,
  },
  TotalWeight: {
    type: Number,
  },
  WeightUnitTypeId: {
    type: Number,
  },
  EquipmentType: {
    type: Number,
  },
  Volume: {
    type: Number,
  },
  VolumeUnits: {
    type: Number,
  },
  LoadDescription: {
    type: String,
  },
  LTLFlag: {
    type: Boolean,
  },
  AssignedTractorNumber: {
    type: String,
  },
  AssignedTrailerNumber: {
    type: String,
  },
  Division: {
    type: String,
  },
  LineItems: [
    {
      ChargeTypeId: {
        type: Number,
        required: true,
      },
      Description: {
        type: String,
        required: true,
      },
      Amount: {
        type: Number,
        required: true,
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
  Stops: [
    {
      Consignee: {
        type: String,
      },
      Sequence: {
        type: String,
      },
      Address1: {
        type: String,
      },
      Address2: {
        type: String,
      },
      City: {
        type: String,
      },
      State: {
        type: String,
      },
      PostalCode: {
        type: String,
      },
      Country: {
        type: String,
      },
      StopDeliveryDate: {
        type: Date,
      },
    },
  ],
  ExpectedDeliveryDate: {
    type: Date,
  },
});

var Load_tp = mongoose.model('tp_load', LoadSchema_tp);

export default Load_tp;