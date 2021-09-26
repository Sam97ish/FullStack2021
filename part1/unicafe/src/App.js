import React, { useState } from 'react'


const Header = () =>{ return( <h1>Give feedback</h1>)}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StaticLine = ({text, stat}) => {
  return(
      <tr>
        <td>{text}</td>
        <td>{stat}</td>
      </tr>

  )
}

const Statistic = ({good, neutral, bad}) => {
  if(good === 0 && bad === 0 && neutral ===0){
    return(
      <div>
        No feedback is given yet.
      </div>
    )
  }else{

    return(
      <table>
        <tbody>
        <StaticLine text="Good" stat={good}/>
        <StaticLine text="Bad" stat={bad}/>
        <StaticLine text="Neutral" stat={neutral}/>
        <StaticLine text="All" stat={good + bad + neutral}/>
        <StaticLine text="Good" stat={good}/>
        <StaticLine text="Average" stat={(good + bad)/good + bad + neutral}/>
        <StaticLine text="Postive" stat={good/(good + bad + neutral)}/>
      </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button onClick={()=> setGood(good+1)} text ="Good" />
      <Button onClick={()=> setNeutral(neutral+1)} text ="Neutral" />
      <Button onClick={()=> setBad(bad+1)} text ="Bad" />
      <h1>Statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App