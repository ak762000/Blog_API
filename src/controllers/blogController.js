const express = require('express')
const User = require('../models/User')
const Blog = require('../models/Blog')
const async_handler = require('express-async-handler')
const auth = require('../middlewares/auth')
const { createBlogSchema } = require('../helpers/validateData')

const createBlog = async_handler(async(req,res)=>{
    const {title,blog} = await createBlogSchema.validateAsync(req.body)
    const owner = req.user._id
    const email = req.user.email

    console.log(owner)
    if(!owner){
        return res.status(400).json({ message : 'Owner ID not fetched from User model!'})
    }
    const newBlog = new Blog({
        title,blog,owner,email
    })
    await newBlog.save()
    res.status(200).json({
        newBlog,
        message : "Blog created successfully!"
    })

    const user_blogs = await User.findOne({
        _id : req.user._id
    })
    user_blogs.blogs.push(newBlog)
    await user_blogs.save()
})

const getallblogs = async_handler(async(req,res)=>{
    const get_blogs = await Blog.find({
        owner : req.user._id,
    })
    const totalblogsforuser = await Blog.countDocuments({ owner : req.user._id})
    const countBlogs = await Blog.countDocuments()
    if (get_blogs.length === 0){
        return res.status(400).json({ message : 'Blogs not found!'})
    }
    res.status(200).json({ get_blogs, totalblogsforuser, countBlogs, message : "All blogs retrieved!"})
})

const getblogbyid = async_handler(async(req,res)=>{
    const getID = req.params.id
    const blog = await Blog.findOne({
        _id : getID,
        owner : req.user._id
    })
    if(!blog){
        return res.status(400).json({ message : 'blog not found!'})
    }
    res.status(200).json({data : blog, message : 'blog found for the specified ID '})
})

const updateBlog = async_handler(async(req,res)=>{
    const { title, blog } = await createBlogSchema.validateAsync(req.body)
    const getID = req.params.id
    const Blogs = await Blog.findById(getID)
    if(!Blogs){
        return res.status(404).json({ message : 'Blog not found!'})       
    }
    Blogs.title = title
    Blogs.blog = blog

    const updatedBlog = await Blogs.save()
    if(!updatedBlog){
        return res.status(404).json({ message : 'Blog not found!'})
    }
    res.status(200).json({ updatedBlog, message : 'Blog updated successfully!'})
})

const deleteBlog = async_handler(async(req,res)=>{
    const getID = req.params.id
    const delBlog = await Blog.findOneAndDelete({ _id : getID })
    if(!delBlog){
        return res.status(404).json({ message : 'Blog not found! '})
    }
    res.status(200).json({ message : 'Deleted Blog successfully!'})
})







module.exports = {createBlog, getallblogs, getblogbyid, updateBlog, deleteBlog}