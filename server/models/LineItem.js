import mongoose from 'mongoose';

const LineItemSchema = mongoose.Schema({
    description: String, 
    amount: String,
});

var LineItem = mongoose.model('LineItem', LineItemSchema);

export default LineItem;