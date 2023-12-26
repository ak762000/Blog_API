//1.Register a user
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Use this route to register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 _id: 'user_id'
 *                 username: 'example_user'
 *                 email: 'user@example.com'
 *                 password: '********'
 *               message: 'User created successfully!'
 *       409:
 *         description: Email ID already registered or username exists
 *         content:
 *           application/json:
 *             example:
 *               error: 'Email ID already registered!'
 */

// 2. Login a user
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Use this route to log in a user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               accessToken: 'your-access-token'
 *               user:
 *                 _id: 'user_id'
 *                 username: 'example_user'
 *                 email: 'user@example.com'
 *               message: 'Logged In successfully!'
 *       401:
 *         description: User not registered or password doesn't match
 *         content:
 *           application/json:
 *             example:
 *               message: "Password doesn't match!"
 */

// 3. Get all users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get list of users
 *     description: Use this route to retrieve the list of users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - _id: 'user_id_1'
 *                   username: 'example_user_1'
 *                   email: 'user1@example.com'
 *                 - _id: 'user_id_2'
 *                   username: 'example_user_2'
 *                   email: 'user2@example.com'
 *               users: 2
 *               message: 'Users retrieved successfully'
 *       404:
 *         description: User result not retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'User result not retrieved successfully!'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

// 4. Create a new blog 
/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     description: Use this route to create a new blog.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlog'
 *     responses:
 *       200:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             example:
 *               newBlog:
 *                 _id: 'blog_id'
 *                 title: 'Blog Title'
 *                 blog: 'Blog content goes here'
 *                 owner: 'user_id'
 *                 email: 'user@example.com'
 *               message: 'Blog created successfully!'
 *       400:
 *         description: Owner ID not fetched from User model
 *         content:
 *           application/json:
 *             example:
 *               message: 'Owner ID not fetched from User model!'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

//5. Get all blogs per authenticated user
/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs for the authenticated user
 *     description: Use this route to retrieve all blogs for the authenticated user.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     responses:
 *       200:
 *         description: All blogs retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               get_blogs:
 *                 - _id: 'blog_id_1'
 *                   title: 'Blog Title 1'
 *                   blog: 'Blog content goes here 1'
 *                   owner: 'user_id'
 *                   email: 'user@example.com'
 *                 - _id: 'blog_id_2'
 *                   title: 'Blog Title 2'
 *                   blog: 'Blog content goes here 2'
 *                   owner: 'user_id'
 *                   email: 'user@example.com'
 *               totalblogsforuser: 2
 *               countBlogs: 10
 *               message: 'All blogs retrieved!'
 *       400:
 *         description: Blogs not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Blogs not found!'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

//6.Get blog by blog ID
/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     description: Use this route to retrieve a blog by its ID for the authenticated user.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to retrieve
 *     responses:
 *       200:
 *         description: Blog found successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 _id: 'blog_id'
 *                 title: 'Blog Title'
 *                 blog: 'Blog content goes here'
 *                 owner: 'user_id'
 *                 email: 'user@example.com'
 *               message: 'Blog found for the specified ID'
 *       400:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Blog not found!'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

//7. Update blog 
/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     description: Use this route to update a blog by its ID for the authenticated user.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBlog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             example:
 *               updatedBlog:
 *                 _id: 'blog_id'
 *                 title: 'Updated Blog Title'
 *                 blog: 'Updated Blog content goes here'
 *                 owner: 'user_id'
 *                 email: 'user@example.com'
 *               message: 'Blog updated successfully!'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Blog not found!'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

//8. Delete blog
/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     description: Use this route to delete a blog by its ID for the authenticated user.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to delete
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Deleted Blog successfully!'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Blog not found!'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

//9. post a comment for the required blog
/**
 * @swagger
 * /blogs/{id}/comments:
 *   post:
 *     summary: Create a new comment on a blog
 *     description: Use this route to create a new comment on a specific blog.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateComment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             example:
 *               comment:
 *                 _id: 'comment_id'
 *                 text: 'Comment text goes here'
 *                 owner: 'user_id'
 *                 blog: 'blog_id'
 *               message: 'Comment created successfully!'
 *       404:
 *         description: User ID or Blog ID not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'User ID not found'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

//10. get all comments for the specified blog 
/**
 * @swagger
 * /blogs/{id}/comments:
 *   get:
 *     summary: Get all comments for a blog
 *     description: Use this route to retrieve all comments for a specific blog.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to retrieve comments for
 *     responses:
 *       200:
 *         description: All comments retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               comments:
 *                 - _id: 'comment_id_1'
 *                   text: 'Comment text goes here 1'
 *                   owner: 'user_id_1'
 *                   blog: 'blog_id'
 *                 - _id: 'comment_id_2'
 *                   text: 'Comment text goes here 2'
 *                   owner: 'user_id_2'
 *                   blog: 'blog_id'
 *               message: 'Get all comments for a specified blog ID'
 *       404:
 *         description: Blog ID not found or no comments found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Blog ID not found'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

//11. delete comment for the specified blog
/**
 * @swagger
 * /comments/{comment_ID}:
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Use this route to delete a comment by its ID for the authenticated user.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: comment_ID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Comment Deleted successfully!'
 *       404:
 *         description: Comment ID not found or Comment not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Comment ID not found'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */
