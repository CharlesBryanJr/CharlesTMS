import mongoose from 'mongoose';

const EmbeddedShippedItemSchema = mongoose.Schema({
    tms_id: String,
    description: String,
    class_name: String,
    item_type: String,
    nmfc: String,
    hazardous_material: Boolean,
    quantity: String,
    weight: [
        {
            amount: String, // Decimal number
            units: String, // "pounds" or "kilograms"
        }
    ],
    // weight: [WeightWithUnit],
    width: String, // Decimal number
    height: String, // Decimal number
    length: String // Decimal number
});

var EmbeddedShippedItem = mongoose.model('EmbeddedShippedItem', EmbeddedShippedItemSchema);

export default EmbeddedShippedItem;