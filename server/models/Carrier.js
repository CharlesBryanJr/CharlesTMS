import mongoose from 'mongoose';

const carrierSchema = mongoose.Schema({
    name: String,
    active: String,
    tms_id: String, // Your internal unique identifier for this carrier in your system
    held: Boolean, // Indicates that payments should be paused/withheld for this carrier
    quickpay_allowed: Boolean, // Deterimes whether a carrier may QuickPay invoice terms
    days_to_pay: Number,
    alternate_id: String, // A reference the user will use to make sure it matches TMS
    dba_name: String, // Alternate company name for this carrier
    primary_contact: String,
    payment_strategy: String,
    status_note: String, // Indicates why a carrier is held
    division: String,
    category: String, // Determines the Payout Terms available to the carrier
    default_payout_term_code: String, // If a carrier has a default payout term set, and an invoice has the term field set, then TriumphPay will select the option that pays the carrier quickest—see Payout Terms for available options
    assigned_factor_id: String, // Factoring Company ID indicating an active factoring relationship
    ein: String,
    mc_numbers: [String],
    dot_numbers: [String],
    scacs: [String],
    labels: [String],
    contact_emails: [String],
    phone_numbers: [String],
    fax_numbers: [String],
    additional_data: [
        {
            field: { type: String }, // Reference field name
            value: { type: String }, // Reference field value
            type: { type: Number } // 0 for integration details, 1 for reference numbers, 2 for internal reference numbers
        }
    ],
    // additional_data: [AdditionalData], // Used to record reference numbers
    company_address: {
        name: String,
        line_1: String,
        line_2: String,
        city: String,
        state: String, // Must use the 2-letter abbreviated format (i.e. "TX")
        postal_code: String
    },
    // company_address: {Address}, // Physical business address of the carrier
    remit_address: {
        name: String,
        line_1: String,
        line_2: String,
        city: String,
        state: String, // Must use the 2-letter abbreviated format (i.e. "TX")
        postal_code: String
    },
    // remit_address: {Address}, // Payment address for the carrier (i.e. a factor's address)
});

const Carrier = mongoose.model('Carrier', carrierSchema);

export default Carrier;