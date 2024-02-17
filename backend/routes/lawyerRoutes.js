const express = require('express')
const router = express.Router()

const {registerLawyer,loginLawyer, getLawyerDashboard, listOfLawyers, acceptCase, rejectCase} = require('../controllers/lawyerController')
const { protect } = require('../middleware/authMiddleware')

router.post('/getlist',listOfLawyers)
router.post('/', registerLawyer)
router.post('/login', loginLawyer)
router.get('/me', protect, getLawyerDashboard)
router.post('/accept',acceptCase) 
router.post('/reject',rejectCase)

module.exports = router