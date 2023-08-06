import mongoose from 'mongoose';

const LoadReferenceSchema = mongoose.Schema({
    name: String,
    value: String,
    type: String // "integration_detail", "broker_visible_detail", or "carrier_visible_detail"
});

var LoadReference = mongoose.model('LoadReference', LoadReferenceSchema);

export default LoadReference;