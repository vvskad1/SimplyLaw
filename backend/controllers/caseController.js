const asyncHandler = require('express-async-handler')
// async needed because mongoose works on promises
const Case = require('../models/caseModel')


// @desc get existing cases 
// GET /api/cases
const getCases = asyncHandler(async(req,res) => {
    if(req.type == "c"){
        const cases = await Case.find({aadhar_no: req.payload.aadhar_no})
        res.status(200).json(cases)
    }else if(req.type == "l"){
        const cases = await Case.find({lawyer_email: req.payload.email})
        res.status(200).json(cases)
    }else if(req.type == "a"){
        const cases = await Case.find({admin_email: req.payload.email})
        res.status(200).json(cases)
    }
})


// @desc Set new case - 
// @route POST /api/cases
// @access Private after we add authentication
const setCase = asyncHandler(async(req,res) => {
    if(!req.body.aadhar_no ||
        !req.body.caseType || 
        !req.body.caseDescription || 
        !req.body.caseDate) { //ERROR handling
        res.status(400)
        throw new Error('Please add info completely')
    }

    if(req.type === "a"){
        const newCase = await Case.create({
            aadhar_no: req.body.aadhar_no,
            caseType : req.body.caseType,
            caseDescription : req.body.caseDescription,
            caseDate : req.body.caseDate,
            constituency: req.body.constituency,
            admin_id: req.payload._id
        })
        res.status(200).json(newCase)
    }else{
        res.status(401)
        throw new Error('Admins are only allowed')
    }  
})


//@desc Update Case
//@route PUT /api/cases/:id
//@access Private after we add authentication
const updateCase = asyncHandler(async(req,res) => {
    const toUpdateCase = await Case.findById(req.params.id)

    if(!toUpdateCase) {  //if no id is passed in the URL
        res.status(400)
        throw new Error('Case ID not provided')
    }

    // const user = await User.findById(req.user.id)

    // //check for user
    // if(!user){
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // //make sure case object field's user id matches with user id found from token
    // if(toUpdateCase.user.toString() != user.id){
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    const reqCaseUpdated = await Case.findByIdAndUpdate(req.params.id, req.body , {
        new : true, //will create if it doesn't exist
    })

    res.status(200).json(reqCaseUpdated)
})




//@desc Delete Case
//@route DELETE /api/cases/:id
//@access Private after we add authentication
const deleteCase = asyncHandler(async(req,res) => {
    const toRemoveCase = await Case.findById(req.params.id)
    //const user = await User.findById(req.user.id)
    
    if(!toRemoveCase) {  //if no id is passed in the URL
        res.status(400)
        throw new Error('Case ID not provided')
    }

    //  //check for user
    //  if(!user){
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // //make sure case object field's user id matches with user id found from token
    // if(toRemoveCase.user.toString() != user.id){
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }
    
    //await Case.remove()
    await Case.findByIdAndRemove(req.params.id)

    res.status(200).json({ id : req.params.id })


})



module.exports = {   //exporting to caseRoutes
    getCases,
    setCase,
    updateCase,
    deleteCase,
}