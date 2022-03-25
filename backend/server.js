const express = require("express")
const dotenv = require('dotenv').config()
const colors = require('colors');
const connectDB = require('./config/db');
const {errorHandler} = require("./middleware/errorMiddleware")
const portNo = process.env.PORT || 5000

connectDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/api/goals",require('./routes/goalRoutes'))
app.use(errorHandler)
app.listen(portNo,()=>console.log(`Server started on port ${portNo}`))