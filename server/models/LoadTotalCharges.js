import mongoose from 'mongoose';

const LoadTotalChargesSchema = mongoose.Schema({
    carrier_amount: String, // Decimal number
    customer_amount: String, // Decimal number
    currency: String
});

var LoadTotalCharges = mongoose.model('LoadTotalCharges', LoadTotalChargesSchema);

export default LoadTotalCharges;