const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const async_handler = require('express-async-handler')
const User = require('../models/User')
const nodemailer = require('nodemailer')//To generate email otp 
const { userSchema, loginSchema, otpSchema, changePasswordSchema } = require('../helpers/validateData')

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'anuragkrishnan90145@gmail.com',
        pass : 'hpsz ecmx sycr cjnw'
    }
})


const register_controller = async_handler(async(req,res)=>{
    const register_result = await userSchema.validateAsync(req.body)

    const existingUser = await User.findOne({ email : register_result.email})
    if(existingUser){
        return res.status(409).json({ error : 'Email ID already registered!'})
    }

    const existingUsername = await User.findOne({ username : register_result.username})
    if(existingUsername){
        return res.status(409).json({ error : "User name exists!"})
    }
    const user = new User(register_result)
    await user.save()

    const user_id = user._id
   //console.log(user_id)

    res.status(200).json({
        data : user,
        message : "User created successfully!"
    })
})

const login_controller = async_handler(async(req,res)=>{
    const login_result = await loginSchema.validateAsync(req.body)
    const user = await User.findOne({ email : login_result.email})
    if(!user){
        return res.status(200).json({ message : 'User not registered!'})
    }
    const isMatch = await bcrypt.compare(login_result.password,user.password)
    if(!isMatch){
        return res.status(401).json({ message : "Password doesn't match!"})
    }
    const accessToken = jwt.sign({
        user : {
            _id : user._id,
            username : user.username,
            email : user.email
        }
    },"admin",{expiresIn : "180m"})
    res.status(200).send({ accessToken, user , message : "Logged IN successfully!"})
})

const getUsers = async_handler(async(req,res)=>{
    const user_result = await User.find()
    const totalUsers = await User.countDocuments()
    if(!user_result){
        res.status(404).json({message : "User result not retrieved successfully!"})
    }

    res.status(200).json({data : user_result ,users : totalUsers,  message : "Users retrieved successfully!"})
})

const sendOTP = async_handler(async(req,res) =>{
    const {email} = await otpSchema.validateAsync(req.body)
    const otp = Math.floor(100000 + Math.random() * 900000)
    const mailOptions = {
        from : 'anuragkrishnan90145@gmail.com',
        to : 'krishnananurag26@gmail.com',
        subject : 'OTP for verification',
        text : 'Your OTP for verification is ' + otp
    }
    transporter.sendMail(mailOptions, async(err,info)=>{
        if(err){
            res.status(500).json({ message : err.message})
        }else{
            const user = await User.findOne({ email })
            if(!user){
                return res.status(400).json({ message : "User not found!"})
            }
            user.otp = otp
            user.otpTimestamp = new Date()
            await user.save()
            res.status(200).json({ message : 'OTP sent successfully!'})
        }
    })
    
})

const newPassword = async_handler(async(req,res)=>{
    const {email, otp, newPassword} = await changePasswordSchema.validateAsync(req.body)
    const user = await User.findOne({ email })
    if(!user){
        return res.status(400).json({ message : 'User not found!'})
    }
    if(user.otp != otp){
        return res.status(400).json({ message : 'Invalid OTP!'})
    }

    const otpExpirationTime = 5 * 60 * 1000
    const currentTime = new Date().getTime()
    if(user.otpTimestamp && currentTime - user.otpTimestamp > otpExpirationTime){
        return res.status(400).json({ message : 'OTP has expired!'})
    }

    user.password = newPassword
    user.otp = null
    user.otpTimestamp = null
    await user.save()
    
    res.status(200).json({ message : 'Password Changed successfully!'})
})

module.exports = { register_controller , login_controller , getUsers , sendOTP, newPassword}
