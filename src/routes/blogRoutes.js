const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {createBlog, getallblogs, getblogbyid, updateBlog, deleteBlog  } = require('../controllers/blogController')
const { createComment, getComments, deleteComments } = require('../controllers/commentController')

router.use(auth)
router.post('/createblog', createBlog)//Post blog for a authenticated user
router.get('/getallblogs', getallblogs)//Get blogs for all the users
router.route('/getallblogs/:id').get(getblogbyid).put(updateBlog).delete(deleteBlog)//update,delete blog via blog ID
router.route('/getallblogs/:id/comment').post(createComment).get(getComments) //post comment and get comments via blog ID
router.route('/getallblogs/comment/:comment_ID').delete(deleteComments) //Delete comment by comment Id

module.exports = router