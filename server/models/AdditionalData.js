import mongoose from 'mongoose';

const AdditionalDataSchema = mongoose.Schema({
    field: String, // Reference field name
    value: String, // Reference field value
    type: Number // 0 for integration details, 1 for reference numbers, 2 for internal reference numbers
});

var AdditionalData = mongoose.model('AdditionalData', AdditionalDataSchema);

export default AdditionalData;