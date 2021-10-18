import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => (
    <div className="w3-bar w3-black">
        <Link to={'/'} className="w3-bar-item w3-button w3-mobile">Home</Link>
        <Link to={'/users'} className="w3-bar-item w3-button w3-mobile">Users</Link>
        <Link to={'/shops'} className="w3-bar-item w3-button w3-mobile">Shops</Link>
        <Link to={'/offers'} className="w3-bar-item w3-button w3-mobile">Offers</Link>
        <Link to={'/about'} className="w3-bar-item w3-button w3-mobile">About</Link>
        <Link to={'/login'} className="w3-bar-item w3-button w3-mobile">Login</Link>
    </div>
)