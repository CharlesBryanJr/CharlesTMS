import mongoose from 'mongoose';

const NetworkSubmissionLoadConfigSchema = mongoose.Schema({
    document_requirements: [
        {
            document_requirements: [String] // "invoice", "rate_confirmation", "bill_of_lading", "lumper", or "other"
        }
    ]
    // document_requirements: [NetworkSubmissionDocumentType]
});

var NetworkSubmissionLoadConfig = mongoose.model('NetworkSubmissionLoadConfig', NetworkSubmissionLoadConfigSchema);

export default NetworkSubmissionLoadConfig;