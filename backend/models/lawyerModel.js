const mongoose = require('mongoose')

const lawyerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name']
    },
    email: {
        type: String,
        required: [true,'Please add email address'],
        unique: true
    },
    constituency: {
        type: String,
        required: [true,'Please add constituency'],
    },
    experience: {
        type: Number,
        required: [true,'Please add experience']
    },
    fees: {
        type: Number,
        required: [true,'Please add fees']
    },
    password: {
        type: String,
        required: [true,'Please add a password']
    },
    current_cases:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Case' 
    }],
    case_requests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Case' 
    }]
},
{
    timestamps: true
})


module.exports = mongoose.model('Lawyer',lawyerSchema)