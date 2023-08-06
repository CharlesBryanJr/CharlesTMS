import mongoose from 'mongoose';

const AddressSchema = mongoose.Schema({
    name: String,
    line_1: String,
    line_2: String,
    city: String,
    state: String, // Must use the 2-letter abbreviated format (i.e. "TX")
    postal_code: String
});

var Address = mongoose.model('Address', AddressSchema);

export default Address;