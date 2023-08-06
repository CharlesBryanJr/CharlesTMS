import mongoose from 'mongoose';

const WeightWithUnitSchema = mongoose.Schema({
    amount: String, // Decimal number
    units: String, // "pounds" or "kilograms"
});

var WeightWithUnit = mongoose.model('WeightWithUnit', WeightWithUnitSchema);

export default WeightWithUnit;