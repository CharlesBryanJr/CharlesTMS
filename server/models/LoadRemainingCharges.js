import mongoose from 'mongoose';

const LoadRemainingChargesSchema = mongoose.Schema({
    carrier_amount: String, // Decimal number
    currency: String
});

var LoadRemainingCharges = mongoose.model('LoadRemainingCharges', LoadRemainingChargesSchema);

export default LoadRemainingCharges;