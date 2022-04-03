import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'


const initialState = {
    goals:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""

}

// Get goals
export const getGoals = createAsyncThunk('goal/getAll', async (gdd,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Create New Goal
export const createGoal = createAsyncThunk("goal/create",async (goalData,thunkAPI)=>{

    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData.text,token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()

        return thunkAPI.rejectWithValue(message)
    }

})

// Delete Goal
export const deleteGoal = createAsyncThunk("goal/delete",async (goalData,thunkAPI)=>{

    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(goalData._id,token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()

        return thunkAPI.rejectWithValue(message)
    }

})

// update Goal
export const updateGoal = createAsyncThunk("goal/update",async (goalData,thunkAPI)=>{

    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.updateGoal(goalData,token) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()

        return thunkAPI.rejectWithValue(message)
    }

})

export const goalSlice = createSlice({
    name:"goal",
    initialState:initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder.addCase(createGoal.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createGoal.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message =action.payload
        })
        .addCase(createGoal.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
        })
        .addCase(getGoals.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getGoals.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message =action.payload
        })
        .addCase(getGoals.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals=action.payload
        })
        .addCase(deleteGoal.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteGoal.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message =action.payload
        })
        .addCase(deleteGoal.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter((goal)=>goal._id!==action.payload.id)
        })
        .addCase(updateGoal.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateGoal.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.message =action.payload
        })
        .addCase(updateGoal.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            let index = state.goals.findIndex(goal=>goal._id===action.payload._id)
            state.goals[index]=action.payload
        })
    }
})

export const {reset} = goalSlice.actions

export default goalSlice.reducer