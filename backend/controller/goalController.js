const asyncHandler = require("express-async-handler")

const Goal = require('../models/goalModel');

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res)=>{
    const goals = await Goal.find()

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
        text:goalText
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
    // console.log(goal)
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
    goal.remove()
    res.status(200).json({id:req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};
