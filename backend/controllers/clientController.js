const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Client = require('../models/clientModel')
const Lawyer = require('../models/lawyerModel')
const Case = require('../models/caseModel')
const { generateToken } = require('../middleware/authMiddleware')
const type = "c"

//create a client, post request clients/, public access
const registerClient = asyncHandler(async(req,res) => {
    const {name, aadhar_no, password} = req.body

    if((!name || !aadhar_no || !password)){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    // check if client exists
    const clientExists = await Client.findOne({aadhar_no})
    if(clientExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    //Hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create a client 
    const createdclient = await Client.create({
        name,
        aadhar_no,
        password: hashedPassword,
        
    })

    //if client successfully created 
    if(createdclient) {
        res.status(201).json({
            _new_id: createdclient.id,
            created_name:  createdclient.name,
            created_aadhar_no: createdclient.aadhar_no,
            token: generateToken(createdclient.id, type)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }
})

//login client, post request clients/login , public access
const loginClient = asyncHandler(async(req,res) => {
    const {aadhar_no, password} = req.body

    //check if user is registered via aadhar 
    const existingClient = await Client.findOne({aadhar_no})

    if(existingClient && (await bcrypt.compare(password, existingClient.password))){
        res.json({
            _id: existingClient.id,
            name: existingClient.name,
            aadhar_no: existingClient.aadhar_no,
            token: generateToken(existingClient.id,type)
        })
    }else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }

})

//get logged in client's data, get request clients/me, private access
const getClientDashboard = asyncHandler(async(req,res) => {

    info = req.payload
    const casesOfClient = await Case.find({aadhar_no: Number(req.payload.aadhar_no)})
    res.status(200).json({
        info,
        clientcases: casesOfClient
    })
})

const chooseLawyer = asyncHandler(async(req,res) => {
    try {
        //find lawyer and update his case requests 
        const chosenLawyer = await Lawyer.findById(req.body.lawyerId)
        console.log("chosen lawyer "+ chosenLawyer)
        const caseID = req.body.caseId
        const chosenCase = await Case.findById(req.body.caseId)
        console.log("chosen case "+chosenCase)
        await chosenLawyer.case_requests.push(caseID);
        chosenCase.lawyermail = chosenLawyer.email
        //await Lawyer.save(chosenLawyer)
        await chosenCase.save()
        await chosenLawyer.save();
        res.status(200).json({ message: 'Request sent to lawyer '+ chosenLawyer.name + 'regarding caseId' + caseID});
      } 
    catch (error) {
        res.status(500).json({ 
          message: 'Request failed to send',
    });
    }     
});


module.exports = {
    registerClient,
    loginClient,
    getClientDashboard,
    chooseLawyer
}