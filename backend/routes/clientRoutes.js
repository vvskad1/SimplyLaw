const express = require('express')
const router = express.Router()

const {registerClient,loginClient, getClientDashboard, chooseLawyer} = require('../controllers/clientController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerClient)
router.post('/login', loginClient)
router.post('/chosenlawyer', chooseLawyer)
router.get('/me', protect, getClientDashboard)

module.exports = router