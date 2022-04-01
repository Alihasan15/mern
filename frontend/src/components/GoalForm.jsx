import { useState } from "react"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import {createGoal} from '../features/goal/goalSlice'

function GoalForm(state) {
    const [goalData, setGoalData] = useState({
        text:""
    })

    const {text} = goalData

    const dispatch = useDispatch()



    const onSubmit = (e)=>{
        e.preventDefault();
        dispatch(createGoal(goalData))
        setGoalData({text:""})
    }
    const onChange=(e)=>{
        setGoalData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }

    return(
        <>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="text">Goal</label>
                        <input type="text" className='form-control' id="text" name='text' value={text} placeholder="Enter goal" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Add Goal </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default GoalForm