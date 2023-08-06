import mongoose from 'mongoose';

const LoadSchema = mongoose.Schema({
    tms_id: String, // Your internal unique identifier for this load in your system
    load_id: String, // Human-understandable identifer referenced on the paperwork
    carrier_tms_id: String, // Your internal unique identifier for a carrier in your system
    canonical_status: String, // "delivered", "undelivered", "issue", or "canceled"
    total_charges: {
        carrier_amount: String, // Decimal number
        customer_amount: String, // Decimal number
        currency: String
    },
    // total_charges: {LoadTotalCharges},
    remaining_charges: {
        carrier_amount: String, // Decimal number
        currency: String
    },
    // remaining_charges: {LoadRemainingCharges},
    distance: {
        amount: String, // Represents a decimal number
        units: String, // "cubic_feet" or "cubic_meters"
    },
    // distance: DistanceWithUnit,
    quantity: Number,
    status: String,
    tms_created_at: String, // ISO8601 datetime
    tms_updated_at: String, // ISO8601 datetime
    target_ship_start: String, // ISO8601 datetime
    target_ship_end: String, // ISO8601 datetime
    actual_shipped_at: String, // ISO8601 datetime
    target_delivery_start: String, // ISO8601 datetime
    target_delivery_end: String, // ISO8601 datetime
    actual_delivered_at: String, // ISO8601 datetime
    origin_address: {
        name: String,
        line_1: String,
        line_2: String,
        city: String,
        state: String,
        postal_code: String,
        country_code: String
    },
    // origin_address: {PartialAddress},
    destination_address: {
        name: String,
        line_1: String,
        line_2: String,
        city: String,
        state: String,
        postal_code: String,
        country_code: String
    },
    // destination_address: {PartialAddress},
    picks: [{
        tms_id: String,
        shipment_tms_ids: [String],
        address: {
            name: String,
            line_1: String,
            line_2: String,
            city: String,
            state: String,
            postal_code: String,
            country_code: String
        },
        // address: {PartialAddress}
    }],
    // picks: [EmbeddedStop],
    drops: [{
        tms_id: String,
        shipment_tms_ids: [String],
        address: {
            name: String,
            line_1: String,
            line_2: String,
            city: String,
            state: String,
            postal_code: String,
            country_code: String
        },
        // address: {PartialAddress}
    }],
    // drops: [EmbeddedStop],
    require_pod: Boolean,
    require_weight_ticket: Boolean,
    require_customer_rate_confirmation: Boolean,
    require_originals: Boolean,
    pro_number: String,
    brokered: Boolean,
    mode: String,
    freight_class: String,
    memo: String,
    delivery_number: String,
    ppe: String,
    quote_number: String,
    load_note: String,
    payables_note: String,
    quickpay: Boolean,
    days_to_pay: Number,
    office: String,
    sales_rep: String,
    business_unit: String,
    priority: String,
    blind: Boolean,
    shipped_items: [
        {
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
        }
    ],
    // shipped_items: [EmbeddedShippedItem],
    shipments: [
        {
            tms_id: String,
            shipment_id: String
        }
    ],
    // shipments: [EmbeddedShipment],
    weight: [
        {
            amount: String, // Decimal number
            units: String, // "pounds" or "kilograms"
        }
    ],
    // weight: [WeightWithUnit],
    equipment_type: String,
    volume: [
        {
            amount: String, // Represents a decimal number
            units: String, // "cubic_feet" or "cubic_meters"
        }
    ],
    // volume: [VolumeWithUnit],
    load_description: String,
    is_ltl: Boolean,
    assigned_tractor_number: String,
    assigned_trailer_number: String,
    division: String,
    references: [
        {
            name: String,
            value: String,
            type: String // "integration_detail", "broker_visible_detail", or "carrier_visible_detail"
        }
    ],
    // references: [LoadReference],
    network_submission: [
        {
            document_requirements: [
                {
                    document_requirements: [String] // "invoice", "rate_confirmation", "bill_of_lading", "lumper", or "other"
                }
            ]
            // document_requirements: [NetworkSubmissionDocumentType]
        }
    ],
    // network_submission: [NetworkSubmissionLoadConfig]
});

var Load = mongoose.model('Load', LoadSchema);

export default Load;