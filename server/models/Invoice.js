import mongoose from 'mongoose';

const InvoiceSchema = mongoose.Schema({
    tms_id: String, // The key that uniquely identifies the Invoice to be added or updated.
    carrier_tms_id: String, // The key that references the carrier to be paid by this invoice. The Key must match a Carrier that has been submitted to /brokers/carriers before the invoice will be able to be paid.
    load_tms_id: String,
    imported_status: String, // The status of the invoice in the TMS. available_for_payment, held, incomplete, removed
    invoice_number: String, // The Broker’s reference number for the invoice. Usually, this is generated by the Carrier.
    reference_number: String, // The Broker’s PO/Reference/Load # for the invoice. Usually, this is generated by the Broker.
    gross_amount: String, // The total amount of the invoice before any deductions or adjustments. Displayed to the broker and carrier for reference purposes only.
    payor_adjustment_amount: String, // The total amount of the deductions and adjustments made by the broker. This number will be negative for deductions from the Invoice gross_amount. Displayed to the broker and carrier for reference purposes only.
    referral_additional_fee_amount: String,
    net_amount: String, // The total amount scheduled to be paid out to the carrier from the TMS. Does not include any fees that will be incurred in the TriumphPay system (wire fees, Quick Pay fees, etc).
    approved_date: String, // The date the invoice was approved for payment. The payout date will be scheduled based on the standard number of days after the approve_date. Payments will not be sent out until an approve_date or due_date is received.
    due_date: String,
    approved_date_locked: Boolean,
    term: String, // This will determine the Payout Term for the invoice. Will default to Standard Pay terms if left blank. If a carrier has a default_payout_term set and the Invoice has the term field set, then TriumphPay will select the option that pays the carrier the quickest. See /brokers/payments/carrier_payout_terms/list for available options.
    bank_account_tms_id: String,
    currency_type: String,
    division: String, // "USD" or "CAD" can be passed to differentiate invoices in US dollars from Canadian dollars. Will default to USD if no value is passed.
    term_category_code: String,
    status_note: String, // The reason an invoice is held when a 'held' status is used in order to display to the carrier.
    import_group_id: String,
    line_items: [
        {
            description: String, 
            amount: String,
        }
    ],
    // line_items: [LineItem],
    additional_data: [
        {
            field: String,
            value: String,
            type: String,
        }
    ],
    // additional_data: [Reference]
});

var Invoice = mongoose.model('Invoice', InvoiceSchema);

export default Invoice;