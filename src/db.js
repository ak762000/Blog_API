require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_URL =  "mongodb+srv://admin:admin@blogdatabase.q9v3zhe.mongodb.net/?retryWrites=true&w=majority"
const DB_NAME = "blogdatabase"

// const MONGO_URL = process.env.MONGO_URL
// const DB_NAME = process.env.DB_NAME

// console.log('MONGO_URL:', MONGO_URL);
// console.log('DB_NAME:', DB_NAME);


//Check if you have connected to the database or not

mongoose.connect(MONGO_URL,{
    dbName : DB_NAME 
}).then(
    ()=>{
        console.log('Connected to database.')
    }
).catch((err)=>{
        console.log('Error connecting to database : ' + err)
    })

module.exports = mongoose