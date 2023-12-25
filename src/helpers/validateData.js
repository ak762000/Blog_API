const Joi = require('@hapi/joi')

const userSchema = Joi.object({
    username : Joi.string().required(),
    email : Joi.string().email().lowercase().required(),
    password : Joi.string().min(8).required()
})

const loginSchema = Joi.object({
    email : Joi.string().lowercase().email().required(),
    password : Joi.string().min(8).required()
})

const otpSchema = Joi.object({
    email : Joi.string().email().lowercase().required()
})

const changePasswordSchema = Joi.object({
    email : Joi.string().email().lowercase().required(),
    otp : Joi.number().required(),
    newPassword : Joi.string().required()
})

const createBlogSchema = Joi.object({
    title : Joi.string().required(),
    blog : Joi.string().required()
})

const createCommentSchema = Joi.object({
    text : Joi.string().required()
})

module.exports = { userSchema, loginSchema, otpSchema, changePasswordSchema, createBlogSchema, createCommentSchema}