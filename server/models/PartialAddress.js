import mongoose from 'mongoose';

const PartialAddressSchema = mongoose.Schema({
    name: String,
    line_1: String,
    line_2: String,
    city: String,
    state: String,
    postal_code: String,
    country_code: String
});

var PartialAddress = mongoose.model('PartialAddress', PartialAddressSchema);

export default PartialAddress;