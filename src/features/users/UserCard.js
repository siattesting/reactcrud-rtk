import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'


export const UserCard = ({ match }) => {

    const { userId } = match.params

    const user = useSelector(state => selectUserById(state, userId))
    console.log("User: =>", user);
    if(!user) return (<div><h4>No user found</h4></div>)

    return (
      <div className="w3-card-4">
        
  
        <header className="w3-container w3-light-grey">
          <h3>{user.username}</h3>
        </header>
  
        <div className="w3-container">
        <img src="img_avatar3.png" alt="Avatar" className="w3-left w3-circle" />
          <p>{user.email}</p>
          
          <hr />
          <p>{user._id}</p>
          <br />
          <p>{user.content}</p>   
        </div>
  
        <div className="w3-bar">
            <Link className="w3-button w3-teal w3-border w3-border-green w3-hover-green w3-right" to={'/users'}>Back</Link>
            <Link to={`/users/${user._id}`} className="w3-button w3-white w3-border w3-border-green w3-left" >
            View user
            </Link>
            <Link to={`/edituser/${user._id}`} className="w3-button w3-white w3-border w3-border-blue w3-left" >
            Edit user
            </Link>
        </div>
        
  
        <button className="w3-button w3-block w3-dark-grey">+ Connect</button>
    
      </div>
    )
  }