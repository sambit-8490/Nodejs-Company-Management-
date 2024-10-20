const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyID:{type:Number, required:true},
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    created_by: { type: String,  required: true },
    status: { type: String, enum: ['approved', 'unapproved'], default: 'unapproved' }
});

module.exports = mongoose.model('Company', companySchema);
