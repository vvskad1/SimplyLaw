const express = require('express')
const router = express.Router()

const { getCases,setCase, updateCase,deleteCase} = require('../controllers/caseController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect,getCases).post(protect,setCase)
router.route('/:id').put(updateCase).delete(protect,deleteCase)


module.exports = router



























//ver 1 
// router.get('/', (req,res) => {
//     res.status(200).json({message: 'Get case'})
// })

// router.post('/', (req,res) => {
//     res.status(200).json({message: 'Set case'})
// })

// router.put('/:id', (req,res) => {
//     res.status(200).json({message: `update case ${req.params.id}`})
// })

// router.delete('/:id', (req,res) => {
//     res.status(200).json({message: `delete case ${req.params.id}`})
// })