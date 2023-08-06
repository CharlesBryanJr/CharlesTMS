import mongoose from 'mongoose';

const NetworkSubmissionDocumentTypeSchema = mongoose.Schema({
    document_requirements: [String] // "invoice", "rate_confirmation", "bill_of_lading", "lumper", or "other"
});

var NetworkSubmissionDocumentType = mongoose.model('NetworkSubmissionDocumentType', NetworkSubmissionDocumentTypeSchema);

export default NetworkSubmissionDocumentType;