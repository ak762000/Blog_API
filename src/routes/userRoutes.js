const express = require('express')
const {register_controller , login_controller , getUsers, sendOTP, newPassword} = require('../controllers/userController')
const router = express.Router()


router.post('/register', register_controller)
router.post('/login' , login_controller)
router.get('/getusers' , getUsers)
router.post('/sendotp', sendOTP)
router.post('/changepassword', newPassword)



module.exports = router