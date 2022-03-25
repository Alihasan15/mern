const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');

const protectUser = asyncHandler(async (req,res, next)=>{
    let token

    if(req.headers.authorization&& req.headers.authorization.startsWith("Bearer")){
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1]

            //Verify token 
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // Get user

            req.user = await user.findById(decoded.id).select("-password")

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if(!token){
        res.status(401)
        throw new Error("No Token in Header")
    }
})

module.exports = {
    protectUser
}