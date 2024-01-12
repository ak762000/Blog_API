const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { defaults } = require('@hapi/joi')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please add you name"]
    },
    email : {
        type : String,
        required : [true,"Please add your email id "],
        unique : [true,"Email ID already taken!"]
    },
    password : {
        type : String,
        required : [true,"Please add password"]
    },
    otp : {
        type : Number
    },
    otpTimestamp : {
        type : Date
    },
    blogs : [{type : mongoose.Schema.Types.ObjectId, ref : 'Blog'}],
    comments_list : [{ type : mongoose.Schema.Types.ObjectId , ref : 'Comment'}]
},{
    timestamps : true
})

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

module.exports = mongoose.model("User",userSchema)