const asyncHandler = require("express-async-handler")
// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res)=>{
    let messageJson = {"message":"get goals"}
    res.status(200).json(messageJson)
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
    let messageJson = {"message":"set goals"}
    res.status(200).json(messageJson)
})
// @desc Update goal
// @route PUT /api/goals/id
// @access Private
const updateGoal = asyncHandler(async (req,res)=>{
    let messageJson = {"message":"goal updated "+req.params.id}
    res.status(200).json(messageJson)
})
// @desc Delete goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req,res)=>{
    let messageJson = {"message":"Goal Deleted "+req.params.id}
    res.status(200).json(messageJson)
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};
