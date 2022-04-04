import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goal/goalSlice'
import GoalItem from '../components/GoalItem'
import { PieChart, Pie, Cell,Legend } from 'recharts';


function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const user = useSelector((state)=>state.auth.user)
  const {goals,isLoading, isError,message} = useSelector((state)=>state.goal) 

  const isCompletedGoals = goals.filter(goal=>goal.isCompleted)
  const isNotCompletedGoalsLength = goals.length - isCompletedGoals.length  

  const data = [
    { name: 'Completed', value: isCompletedGoals.length },
    { name: 'Not Completed', value: isNotCompletedGoalsLength },
  ];
  
  const COLORS = ['#00a8e8', '#003459', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5 ;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) ;
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
      <section className='heading-section'>

        <section className='heading'>
          <h1>Welcome {user && user.name}</h1>
          <p>Goals Dashboard</p>
        </section>
        <div className='pie'>
          <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell name={entry.name} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend payload={data.map(
                (item, index) => ({
                  id: item.name,
                  type: "square",
                  value: `${item.name} (${item.value})`,
                  color: COLORS[index % COLORS.length]
                })
              )
            }></Legend>
          </PieChart>
        </div>
      </section>
      <GoalForm />
      <section className="content">
         {goals.length>0?goals.map((goal,index)=><GoalItem key={goal._id} goal={goal}>{goal.text}</GoalItem>):<h3>You have not set any goal</h3>}
      </section> 
    </>
  )
}

export default Dashboard