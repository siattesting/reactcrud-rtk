import React, { useState } from 'react'
import { useHistory } from 'react-router'

export const Loginpage = () => {
    const history = useHistory()
    const initialFormState = { id: null, name: '', username: '' }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUser({...user, [name]: value })
        console.log(user)
    }

    const canLogin = [user.username, user.password].every(Boolean)

    const handleLogin = (event) => {
        event.preventDefault()
        if ( !canLogin ) return;
        history.push('/home')
    }

    return (
        <section className="w3-container">
            
            <form className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
                <h2 className="w3-center">Log In</h2>
                <div className="w3-row">
                    <label htmlFor="username">Username:</label>
                    <input className="w3-input" type="text" id="username" placeholder="Enter your username" name="username" value={user.username} onChange={handleInputChange} />
                </div>
                <div className="w3-row">
                    <label htmlFor="password">Password:</label>
                    <input className="w3-input" type="password" id="password" placeholder="Enter your password" name="password" value={user.password} onChange={handleInputChange} />
                </div>
                <div className="w3-row w3-section">
                    <button className="w3-button" onClick={handleLogin} disabled={!canLogin} >Login</button>
                    <button className="w3-button">Cancel</button>
                </div>
            </form>
        </section>
    )
}