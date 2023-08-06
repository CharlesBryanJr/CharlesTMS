import mongoose from 'mongoose';

const EmbeddedStopSchema = mongoose.Schema({
    tms_id: String,
    shipment_tms_ids: [String],
    address: {
        name: String,
        line_1: String,
        line_2: String,
        city: String,
        state: String,
        postal_code: String,
        country_code: String
    },
    // address: {PartialAddress}
});

var EmbeddedStop = mongoose.model('EmbeddedStop', EmbeddedStopSchema);

export default EmbeddedStop;