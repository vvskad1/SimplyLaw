const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const Case = require('../models/caseModel')
const { generateToken } = require('../middleware/authMiddleware')
const type = "a"

//create a new Admin account, post request admins/, public access
const registerAdmin = asyncHandler(async(req,res) => {
    const {name, constituency, email, password} = req.body

    if((!name || !constituency || !email || !password)){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    // check if admin exists
    const adminExists = await Admin.findOne({email})
    if(adminExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    //Hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create a client 
    const createdAdmin = await Admin.create({
        name,
        constituency,
        email,
        password: hashedPassword,
        
    })

    if(createdAdmin) {
        res.status(201).json({
            _new_id: createdAdmin.id,
            created_name:  createdAdmin.name,
            created_constituency: createdAdmin.constituency,
            created_email: createdAdmin.email,
            token: generateToken(createdAdmin.id, type)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }
})



const loginAdmin = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    //check if user is registered via email
    const existingAdmin = await Admin.findOne({email})

    if(existingAdmin && (await bcrypt.compare(password, existingAdmin.password))){
        res.json({
            message: 'The logged in Admin details:',
            _id: existingAdmin.id,
            name: existingAdmin.name,
            experience: existingAdmin.experience,
            fees: existingAdmin.fees,
            token: generateToken(existingAdmin.id,type)
        })
    }else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

//get logged in to see Admin's data, admins/me, private access
const getAdminDashBoard = asyncHandler(async(req,res) => {
    info = req.payload
    const casesOfAdmin = await Case.find({admin_id: req.payload._id})
    //console.log(casesOfAdmin)
    res.status(200).json({
        message: "controller level payload",
        info,
        admincases: casesOfAdmin
    })
       
})

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdminDashBoard
}