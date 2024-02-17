const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Lawyer = require('../models/lawyerModel')
const Case = require('../models/caseModel')
const { generateToken } = require('../middleware/authMiddleware')
const type = "l"

//create a new Lawyer account, post request lawyers/, public access
const registerLawyer = asyncHandler(async(req,res) => {
    const { name, experience, fees, email, constituency, password } = req.body

    if((!name || !experience || !fees || !email || !constituency  || !password)){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    // check if lawyer exists
    const lawyerExists = await Lawyer.findOne({email})
    if(lawyerExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    //Hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create a client 
    const createdLawyer = await Lawyer.create({
        name, 
        experience,
        fees,
        email,
        constituency, 
        password: hashedPassword,
    })

    //if lawyer successfully created 
    if(createdLawyer) {
        res.status(201).json({
            Lawyer_id: createdLawyer.id,
            Lawyer_Name:  createdLawyer.name,
            Lawyer_Experience: experience,
            Lawyer_Fees: fees,
            Lawyer_email: email,
            Lawyer_constituency: constituency,
            token: generateToken(createdLawyer.id,type)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }
})

//login existing Lawyer, post request lawyers/login , public access
const loginLawyer = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    //check if user is registered via aadhar 
    const existingLawyer = await Lawyer.findOne({email})

    if(existingLawyer && (await bcrypt.compare(password, existingLawyer.password))){
        res.json({
            message: 'The logged in lawyer details:',
            _id: existingLawyer.id,
            name: existingLawyer.name,
            experience: existingLawyer.experience,
            fees: existingLawyer.fees,
            token: generateToken(existingLawyer.id,type)
        })
    }else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const getLawyerDashboard = asyncHandler(async(req,res) => {
    info = req.payload
    const currentCases = await Case.find({ _id : { $in : req.payload.current_cases }, })
    const caseRequests = await Case.find({ _id : { $in : req.payload.case_requests }, })

    res.status(200).json({
        info,
        lawyerCurrentCases: currentCases,
        lawyerCaseRequests: caseRequests

    })

})





const acceptCase = asyncHandler(async(req,res) => {
    try {
        // Update the case with the new upload ID
        const caseID = req.body.caseId
        const caseAccepted = await Case.findById(req.body.caseId) 
        const AcceptedlawyerId = req.body.lawyerId
        const updateLawyer = Lawyer.findById(AcceptedlawyerId);
        caseAccepted.lawyermail = updateLawyer.email
        caseAccepted.lawyer_fixed = true;
        const tempcase_requests = updateLawyer.case_requests

        const index = tempcase_requests.indexOf(caseID);
        if (index > -1) { // only splice array when item is found
            tempcase_requests.splice(index, 1); // 2nd parameter means remove one item only
        }

        updateLawyer.current_cases.push(caseID)
        updateLawyer.case_requests = tempcase_requests
        await caseAccepted.save();
        res.status(200).json({ message: 'Request accepted to lawyer '+ updateLawyer.name + 'regarding caseId' + caseID});
      } 
    catch (error) {
        res.status(500).json({ 
          message: 'Request could not be accepted',
    });
    }     
});

const rejectCase = asyncHandler(async(req,res) => {
    try {
        console.log(req.body)
        //Update the case with the new upload ID
        const caseID = req.body.caseId
        const caseBeingRejected = await Case.findById(caseID) 
        const RejectinglawyerId = req.body.lawyerId
        const updateLawyer = await Lawyer.findById(RejectinglawyerId);
        caseBeingRejected.lawyermail = null

        const tempcase_requests = updateLawyer.case_requests

        const index = tempcase_requests.indexOf(caseID);
        if (index > -1) { // only splice array when item is found
            tempcase_requests.splice(index, 1); // 2nd parameter means remove one item only
        }
        updateLawyer.case_requests = tempcase_requests

        await caseBeingRejected.save();
        await updateLawyer.save()
        res.status(200).json({ message: 'Request rejected by lawyer '+ updateLawyer.name + 'regarding caseId' + caseID});
    } 
    catch (error) {
        res.status(500).json({ 
          message: 'Request could not be accepted',
    });
    }     
});



const listOfLawyers= asyncHandler(async(req,res) => {
    try {
        const lawyerSameConstituency = await Lawyer.find({constituency: req.body.constituency})
        res.status(200).json(lawyerSameConstituency);
      } 
    catch (error) {
        res.status(500).json({ 
          message: 'Request failed to send',
    });
    }     
});


module.exports = {
    registerLawyer,
    loginLawyer,
    getLawyerDashboard,
    listOfLawyers,
    acceptCase,
    rejectCase
}