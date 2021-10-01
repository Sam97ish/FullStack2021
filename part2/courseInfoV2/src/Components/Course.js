import React from 'react'

const Header = (props) =>{
    return(<>
      <h1>{props.course.name}</h1>
    </>)
  }
  
  const Content = (props) =>{
    return(<>
  
        {props.parts.map(part => 
        <Part key={part.id} part={part} />)}
      
    </>)
  }
  
  const Part =({part}) =>{
    return(
      <>
      <p>
        {part.name} {part.exercises}
      </p>
      </>
    )  
  }
  
  const Total = ({parts}) =>{
  
    const total = parts.reduce((acc, part) => acc+part.exercises, 0)
  
    //console.log(total)
    return(<>
    <p> Total Exercises {total}</p>
    </>)
  }
  
  const Course = (props) => {
    return(
      <>
      {props.courses.map(
        course =>
        <div key = {course.id}>
        
          <Header key = {course.id} course = {course} />
          <Content key = {course.id+1} parts = {course.parts} />
          <Total key = {course.id+2} parts = {course.parts} />
          
        </div>
        )
      }
  
      </>
    )
  }

  export default Course