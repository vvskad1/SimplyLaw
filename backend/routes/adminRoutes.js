const express = require('express')
const router = express.Router()

const {registerAdmin,loginAdmin,getAdminDashBoard} = require('../controllers/adminController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerAdmin)
router.post('/login', loginAdmin)
router.get('/me', protect, getAdminDashBoard)

module.exports = router