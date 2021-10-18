import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => (
    <section className="w3-container">
        <div>
            <h4>Home Page</h4>
            <p>Welcome to ShopsMania</p>
            <div>
                <Link className="w3-button" to={'/shops'}>View Shops</Link>
                <Link className="w3-button" to={'/users'}>View Users</Link>
                <Link className="w3-button" to={'/offers'}>View Offers</Link>
            </div>
        </div>
    </section>
)