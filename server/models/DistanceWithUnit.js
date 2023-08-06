import mongoose from 'mongoose';

const DistanceWithUnitSchema = mongoose.Schema({
    amount: String, // Represents a decimal number
    units: String, // "cubic_feet" or "cubic_meters"
});

var DistanceWithUnit = mongoose.model('DistanceWithUnit', DistanceWithUnitSchema);

export default DistanceWithUnit;