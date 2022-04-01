import axios from 'axios'

const API_URL = "/api/goals/"

// Set Goal
const createGoal = async (goalData,userToken)=>{
    const config = {
        headers: {
          "Authorization": "Bearer "+userToken,
        }
      }
    const response = await axios.post(API_URL,{text:goalData},config)

    return response.data

}
// Get Goals
const getGoals = async (userToken)=>{
  const config = {
    headers: {
      "Authorization": "Bearer "+userToken,
    }
  }
  const response = await axios.get(API_URL,config)

  return response.data
}
// Update Goal
const updateGoal = async (goalId,userToken)=>{
  const config = {
    headers: {
      "Authorization": "Bearer "+userToken,
    }
  }
  const response = await axios.put(API_URL+""+goalId,{},config)

  return response.data
}
// Delete Goal
const deleteGoal = async(goalId,userToken)=>{
  const config = {
    headers: {
      "Authorization": "Bearer "+userToken,
    }
  }
  const response = await axios.delete(API_URL+""+goalId,config)

  return response.data
}

const goalService = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal
}

export default goalService