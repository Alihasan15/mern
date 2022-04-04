import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal, updateGoal } from '../features/goal/goalSlice'
import {FaEdit} from "react-icons/fa";

function GoalItem({goal}) {
  const goalStat = goal.isCompleted||false

  const dispatch=useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [goalText, setGoalText] = useState(goal.text)
  const [goalStatus, setGoalStatus] = useState(goalStat)

  useEffect(() => {
    if(isEdit){
      const goalTextInput = document.getElementById("goalText")
      goalTextInput.focus()
    }
  }, [isEdit])

  // useEffect(() => {
  //   let goalData = {
  //     _id:goal._id,
  //     text:goalText,
  //     isCompleted:goalStatus
  //   }
  //   dispatch(updateGoal(goalData))
  // }, [goalStatus])
  
  
  const onEditConfirmClick = ()=>{
    let goalData = {
      _id:goal._id,
      text:goalText,
      isCompleted:goalStatus
    }
    dispatch(updateGoal(goalData))
  }

  const onChange = (e)=>{
    let goalTextChanged = e.target.value;
    if(goalTextChanged){
      setGoalText(goalTextChanged)

    }
  }

  const onCheckBoxChange = (e)=>{
    const goalSt = e.target.checked
    setGoalStatus(goalSt)
    let goalData = {
      _id:goal._id,
      text:goalText,
      isCompleted:goalSt
    }
    dispatch(updateGoal(goalData))
  }

  return (
    <div className='goal'>
        <div className='goal-date'>
            {new Date(goal.createdAt).toLocaleString("en-US")}
        </div>
        <label className="checkbox-container">
          <input type="checkbox" checked={goalStatus} onChange={onCheckBoxChange}></input>
          <span className="checkmark"></span>
        </label>  
        {
          isEdit?
          <>
          <input type="text" name="goalText" id="goalText" value={goalText} onChange={onChange}/>
          <button className='btn edit-confirm' onClick={onEditConfirmClick}>Edit</button>
          </>:
          <>
          <h2 className={goalStatus?"mb-0 isCompleted":"mb-0"}>{goal.text}</h2><button className='edit' onClick={()=>{setIsEdit(true)}}><FaEdit /></button></>
        }        
        <button className='close' onClick={()=>dispatch(deleteGoal(goal))}>X</button>
    </div>
  )
}

export default GoalItem