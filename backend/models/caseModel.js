//defining the schema for a case
const mongoose = require('mongoose')
//const Client = require('../models/clientModel')

const caseSchema = mongoose.Schema({
    aadhar_no: {
        type: Number,
        required: [true,'Please add an Aadhar Number'],
    },
    caseType: {
        type: String,
        required: [true, 'Please add a caseType'],
    },
    caseDescription: {
        type: String,
        required: [true, 'Please add a caseDescription']
    },
    caseDate: {
        type: String,
        required: [true, 'Please add a caseDate']
    },
    constituency: {
        type: String,
        required: [true, 'Please add a caseDate']
    },
    lawyermail: {
        type: String,
    }
    , 
    lawyer_fixed:{
        type:Boolean,
        default:false
    },
    admin_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
    , 
    evidences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload' 
      }],
      reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload' 
      }],
},
{
    timestamps : true,
})

module.exports = mongoose.model('Case',caseSchema)


// lawyer_id:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Lawyer'
// }