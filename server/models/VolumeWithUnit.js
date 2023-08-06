import mongoose from 'mongoose';

const VolumeWithUnitSchema = mongoose.Schema({
    amount: String, // Represents a decimal number
    units: String, // "cubic_feet" or "cubic_meters"
});

var VolumeWithUnit = mongoose.model('VolumeWithUnit', VolumeWithUnitSchema);

export default VolumeWithUnit;