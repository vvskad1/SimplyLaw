const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Client = require('../models/clientModel')
const Lawyer = require('../models/lawyerModel')
const Admin = require('../models/adminModel')

const generateToken = (id,type) => {
  return jwt.sign({ id,type }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      
      if(decoded.type === "c"){
        req.payload = await Client.findById(decoded.id).select('-password')
      }else if(decoded.type === "l"){
        req.payload = await Lawyer.findById(decoded.id).select('-password')
      }else if(decoded.type === "a"){
        req.payload = await Admin.findById(decoded.id).select('-password')
      }
      req.type = decoded.type;

      console.log("req payload is " + req.payload)

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect,generateToken }