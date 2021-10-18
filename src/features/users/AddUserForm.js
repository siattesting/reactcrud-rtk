import React, { useState} from 'react'
import { useDispatch } from 'react-redux';

import { addNewUser } from './usersSlice'

export const AddUserForm = () => {
    const dispatch = useDispatch()
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    // const [formData, setformData] = useState({
    //     username: '',
    //     email: '',
    // });

    // const handleInputChange = (event) => {
    //     setformData({
    //         ...formData,
    //         [event.target.name]: event.target.value
    //     });
    // };

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)

    const canSave = [username, email].every(Boolean) && addRequestStatus === 'idle';

    const onSaveUserClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(
                    addNewUser({ _id: 'user:'+ new Date().toISOString(), username, email })
                ).unwrap();
                setUsername('')
                setEmail('')

            } catch (err) {
                console.error('Failed to save this item:',  err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    };

    return (
        <section>
          <h2>Add a New User</h2>
          <form className="w3-container">
            <label htmlFor="username">Username:</label>
            <input
              className="w3-input" 
              type="text"
              id="username"
              name="username"
              placeholder="What's your username?"
              value={username}
              onChange={onUsernameChanged}
            />
            <label htmlFor="email">Email:</label>
            <input
              className="w3-input" 
              type="email"
              id="email"
              name="email"
              placeholder="What's your email?"
              value={email}
              onChange={onEmailChanged}
            />
            <button type="button" className="w3-btn w3-blue" onClick={onSaveUserClicked} disabled={!canSave}>
              Save User
            </button>
          </form>
        </section>
      );
}
