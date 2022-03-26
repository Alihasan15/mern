const asyncHandler = require("express-async-handler")

const Goal = require('../models/goalModel');
const user = require("../models/userModel");

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res)=>{
    const goals = await Goal.find({user:req.user.id})

    res.status(200).json(goals)
})
// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req,res)=>{
    let goalText = req.body.text;
    if(!goalText){
        res.status(400)
        throw new Error("Please add a text")
    }
    const goal = await Goal.create({
        text:goalText,
        user:req.user.id
    })
    res.status(200).json(goal)
})
// @desc Update goal
// @route PUT /api/goals/id
// @access Private
const updateGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal Not Found")
    }
    const userUpdate = await user.findById(req.user.id)
    
    // Check if updating user exists
    if(!userUpdate){
        res.status(401)
        throw new Error("User Not Found.")
    }

    //Make sure the user updating is the right user
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error("User Not Authorized.")
    }

    const goalUpdated = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    }) 
    res.status(200).json(goalUpdated)
})
// @desc Delete goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal Not Found")
    }

    const userDelete = await user.findById(req.user.id)
    
    // Check if updating user exists
    if(!userDelete){
        res.status(401)
        throw new Error("User Not Found.")
    }

    //Make sure the user updating is the right user
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error("User Not Authorized.")
    }


    goal.remove()
    res.status(200).json({id:req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};
