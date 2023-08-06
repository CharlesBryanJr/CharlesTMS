import mongoose from 'mongoose';

const ReferenceSchema = mongoose.Schema({
    name: String, // Description/name of the data reference. E.g: reference_number.
    value: String, // Value of the field.
    type: String // integration_detail, payor_reference_number, reference_number
});

var Reference = mongoose.model('Reference', ReferenceSchema);

export default Reference;