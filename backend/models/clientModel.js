const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name']
    },
    aadhar_no: {
        type: Number,
        required: [true,'Please add an Aadhar Number'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please add a password']
    }
},
{
    timestamps: true
})




module.exports = mongoose.model('Client',clientSchema)