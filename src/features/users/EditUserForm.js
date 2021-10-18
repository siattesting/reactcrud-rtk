import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { selectUserById, updateUser } from './usersSlice';

export const EditUserForm = ({ match }) => {
    
    const dispatch = useDispatch()
    const history = useHistory();
    const { userId } = match.params
    const user = useSelector(state => selectUserById(state, userId))
    // console.log(user)
 
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)

    const canSave = [username, email].every(Boolean) && addRequestStatus === 'idle';

    const onSaveUserClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(
                    updateUser({ _id: userId, username, email })
                ).unwrap();
                setUsername('')
                setEmail('')

            } catch (err) {
                console.error('Failed to save this item:',  err)
            } finally {
                setAddRequestStatus('idle')
                history.push(`/users/${userId}`)
            }
        }
    };

    return (
        <section className="w3-card-4">
            <div className="w3-container w3-green">
            <h2>Edit user </h2>
            </div>
          <form className="w3-container w3-card-4">
            <br />
            <label htmlFor="username" className="w3-text-green">Username:</label>
            <input
              className="w3-input w3-border" 
              type="text"
              id="username"
              name="username"
              placeholder="What's your username?"
              value={username}
              onChange={onUsernameChanged}
            />
            <label htmlFor="email" className="w3-text-green">Email:</label>
            <input
              className="w3-input w3-border" 
              type="email"
              id="email"
              name="email"
              placeholder="What's your email?"
              value={email}
              onChange={onEmailChanged}
            />
            <br />
            <div className="w3-container">
                <div className="w3-bar">
                    <button type="button" className="w3-button w3-white w3-border w3-border-green" onClick={onSaveUserClicked} disabled={!canSave}>
                    Save User
                    </button>           

                    <Link to={`/users/${user._id}`} className="w3-button w3-white w3-border w3-border-red" >
                    Cancel
                    </Link>
                </div> 
            </div>
                       
          </form>
        </section>
      );
}
