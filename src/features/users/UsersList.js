import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, selectAllUsers } from './usersSlice'

import { Spinner } from '../../components/Spinner'
// import { PostAuthor } from './PostAuthor'
// import { TimeAgo } from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'

let UserCard = ({ user }) => {
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
      </div>

      <Link to={`/users/${user._id}`} className="w3-button w3-white w3-border w3-border-blue" >
        View user
      </Link>
      <Link to={`/edituser/${user._id}`} className="w3-button w3-white w3-border w3-border-blue" >
        Edit user
      </Link>

      <button className="w3-button w3-block w3-dark-grey">+ Connect</button>

    </div>
  )
}

export const UsersList = () => {

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const userStatus = useSelector(state => state.users.status)
  const errorMessage = useSelector(state => state.users.error)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch( fetchUsers() )
    }

  }, [userStatus, dispatch])

  let content

  if (userStatus === 'loading') {
    content = <Spinner text="Loading users. Please wait..." />

  } else if (userStatus === 'succeeded') {
    content = users.map(user => <UserCard key={user._id} user={user} />)

  } else if (userStatus === 'failed') {
    content = <div>{errorMessage}</div>

  }

  return (
    <section className="w3-container">
      <h2>Users</h2>
      <div>
          <Link to={'/adduser'} className="w3-button w3-white w3-border w3-border-blue">Add user</Link>
      </div>
      <section className="w3-container">
        {content}
      </section>
    </section>
  )
}
