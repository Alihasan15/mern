import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goal/goalSlice'
import GoalItem from '../components/GoalItem'


function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const user = useSelector((state)=>state.auth.user)
  const {goals,isLoading, isError,message} = useSelector((state)=>state.goal) 

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user){
       navigate('/login')
    }
  
    dispatch(getGoals())
    // console.log(goals);

    return ()=>{
      dispatch(reset())
    }

    
  }, [user,navigate,isError,message,dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
         {goals.length>0?goals.map((goal,index)=><GoalItem key={goal._id} goal={goal}>{goal.text}</GoalItem>):<h3>You have not set any goal</h3>}
      </section> 
    </>
  )
}

export default Dashboard