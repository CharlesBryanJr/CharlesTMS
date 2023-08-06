import mongoose from 'mongoose';

const CreditNoteSchema = mongoose.Schema({
    tms_id: String,
    carrier_tms_id: String,
    status: String,
    reference_number: String,
    gross_amount: String,
    description: String,
    credit_date: Time,
    currency_type: String,
    division: String,
    references: [
        {
            field: String,
            value: String,
            type: String
        }
    ],
    invoice_number: String,
    apply_to_keys: [ String ],
    import_group_id: String
});

var CreditNote = mongoose.model('CreditNote', CreditNoteSchema);

export default CreditNote;