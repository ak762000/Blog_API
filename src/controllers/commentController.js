const express = require('express')
const User = require('../models/User')
const Blog = require('../models/Blog')
const Comments = require('../models/Comments')
const async_handler = require('express-async-handler')
const nodemailer = require('nodemailer')
const { createCommentSchema } = require('../helpers/validateData')

//Use nodemailer to send notification whenever a user comments a blog
const sendEmailNotification = (email,postTitle)=>{
    console.log('Email : ', email)
    console.log('PostTitle : ', postTitle)
    
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'anuragkrishnan90145@gmail.com',
            pass : 'hycm ewvu hlew ympc'
        }
    })
    
    const mailOptions = {
        from : 'anuragkrishnan90145@gmail.com',
        to : 'krishnananurag26@gmail.com',
        subject : 'New comment on your blog post',
        text : `Hello,\n\nA new comment has been added to your blog post '${postTitle}'.\n\nVisit your blog to view the comment.`
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.error('Error : ', err)
        }
        else{
            console.log("Email Sent : ", info.response)
        }
    })
}

const createComment = async_handler(async(req,res)=>{
    const { text } = await createCommentSchema.validateAsync(req.body)
    const owner = req.user._id //After authentication
    const blog_ID = req.params.id //Get id from the address bar

    if(!owner){
        return res.status(404).json({ message : "User ID not found"})
    }
    if(!blog_ID){
        return res.status(404).json({ message : 'Blog ID not found!'})
    }
    //Create a comment
    const comment = new Comments({
        text ,
        owner : owner,
        blog : blog_ID
    })
    await comment.save()
    
    //Push the comment to the Blog Model in the database
    const user_ID = await Blog.findOne({
        _id : blog_ID
    })
    user_ID.comments_list.push(comment)// Main method 
    await user_ID.save()

    // //Send email notification
    const author = await User.findOne({ _id : user_ID.owner})
    if(author && author.email){
        sendEmailNotification(author.email, user_ID.title)
    }
    res.status(201).json({
        comment,
        message : "Comment created successfully!"
    })
    
})

const getComments = async_handler(async(req,res)=>{
    const blogID = req.params.id
    if(!blogID){
        return res.status(404).json({ message : "Blog ID not found!"})
    }
    //Get all comments for the specific blog id
    const comments = await Comments.find({
        blog :blogID    
    })
    if(!comments){
        return res.status(404).json({ message : 'Comments not found for the specific blog ID!'})
    }
    res.status(200).json({
        comments,
        message : "Get all comments for a specified blog ID"
    })
})

const deleteComments = async_handler(async(req,res)=>{
    const comment_ID = req.params.comment_ID
    if(!comment_ID ){
        return res.status(404).json({ message : 'Blog ID not found!'})
    }
    const delC = await Comments.findOneAndDelete({ _id : comment_ID})
    if(!delC){
        return res.status(404).json({ message : 'Comment Not found!'})
    }
    res.status(200).json({
        message : "Comment Deleted successfully!"
    })
})


module.exports = { createComment , getComments, deleteComments}