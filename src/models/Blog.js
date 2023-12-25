const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Please add title"]
    },
    blog : {
        type : String,
        required : [true, "Please add blog"]
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    email : {
        type : mongoose.Schema.Types.String,
        ref : 'User',
    },
    comments_list : [{ type : mongoose.Schema.Types.ObjectId , ref : 'Comment'}]
},
{
    timestamps : true
})

module.exports = mongoose.model('Blog', blogSchema)