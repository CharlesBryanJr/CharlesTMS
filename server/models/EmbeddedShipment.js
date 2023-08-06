import mongoose from 'mongoose';

const EmbeddedShipmentSchema = mongoose.Schema(
    {
        tms_id: String,
        shipment_id: String
    }
);

var EmbeddedShipment = mongoose.model('EmbeddedShipment', EmbeddedShipmentSchema);

export default EmbeddedShipment;