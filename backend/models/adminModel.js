const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name']
    },
    constituency: {
        type: String,
        required: [true,'Please add a constituency']
    },
    email: {
        type: String,
        required: [true,'Please add email address'],
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




module.exports = mongoose.model('Admin',adminSchema)