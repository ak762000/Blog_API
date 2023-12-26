//Import required libraries
const express = require('express')
const app = express()
require('dotenv').config()
require('./db')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('../src/routes/userRoutes')
const blogRoutes = require('../src/routes/blogRoutes')
const swagger_ui = require('swagger-ui-express')
const swaggerSpec = require('./helpers/swagger')

// const auth = require('./middlewares/auth')

//Initialize the port number 
const port = process.env.PORT || 7000


app.use(cors())
app.use(express.json())//To take data from the body

// app.use(auth)//Middleware
app.use('/api/auth', userRoutes)//Authentication
app.use('/api', blogRoutes)

app.use('/api-docs', swagger_ui.serve, swagger_ui.setup(swaggerSpec))
//Test case
app.get('/', (req,res)=>{
    res.status(201).json({ message : "Hello World" })
})

//Server listening
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
})