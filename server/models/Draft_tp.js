// InvoiceDraftTo
import mongoose from 'mongoose';

const DraftSchema = new mongoose.Schema({
  id: String,
  draft_date_time: String,
  amount: String,
  invoice_count: Number,
  invoices: [
    {
      payor_term_fee: String,
      carrier_term_fees_to_payor: String,
      carrier_term_fees_to_triumph: String,
      scheduled_draft_date: Date,
      actual_draft_date: Date,
      editable: Boolean,
      amounts_editable: Boolean,
      term_fees_refunded: Boolean,
      invoice_draft_id: String,
      currency_type: String,
      division: String,
      line_items: [
        {
          description: String,
          amount: String
        }
      ],
      // line_items: [LineItem],
      references: [
        {
          field: String,
          value: String,
          type: String
        }
      ],
      // references: [Reference],
      tms_id: String,
      invoice_status: String,
      status_note: String,
      payor_code: String,
      carrier_tms_id: String,
      load_tms_id: String,
      payor_company_name: String,
      carrier_company_name: String,
      factor_company_name: String,
      reference_number: String,
      invoice_number: String,
      quickpay: Boolean,
      payout_term_code: String,
      gross_amount: String,
      adjustment_amount: String,
      term_fee_amount: String,
      net_amount: String,
      payor_net_amount: String,
      uploaded_date: Date,
      approved_date: Date,
      scheduled_payment_date: Date,
      actual_paid_date: Date,
      payout_destination: String,
      payout_confirmation_code: String,
      payout_id: String,
      last_modified_date: Date,
      term_selected_by_carrier: Boolean,
      bank_account_tms_id: String,
      payout_transaction_code: String
    }
  ],
  credit_note_count: Number,
  credit_notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CreditNote' }],
  division: String
});

const Draft = mongoose.model('Draft', DraftSchema);

export default Draft;