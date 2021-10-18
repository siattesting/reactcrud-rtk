import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectShopById } from './shopsSlice'


export const ShopCard = ({ match }) => {

    const { shopId } = match.params

    const shop = useSelector(state => selectShopById(state, shopId))
    console.log("Shop: =>", shop);
    if(!shop) return (<div><h4>No shop found</h4></div>)

    // const { offers } = useSelector(offers)

    return (
      <div className="w3-card-4">
        
  
        <header className="w3-container w3-light-grey">
          <h3>{shop.title}</h3>
        </header>
  
        <div className="w3-container">
        <img src="img_avatar3.png" alt="Avatar" className="w3-left w3-circle" />
          <p>{shop.city}</p>
          
          <hr />
          <p>{shop._id}</p>
          <br />
          <p>{shop.description}</p>   
        </div>
  
        <div className="w3-bar">
            <Link className="w3-button w3-teal w3-border w3-border-green w3-hover-green w3-right" to={'/shops'}>Back</Link>
            <Link to={`/shops/${shop._id}`} className="w3-button w3-white w3-border w3-border-green w3-left" >
            View shop
            </Link>
            <Link to={`/editshop/${shop._id}`} className="w3-button w3-white w3-border w3-border-blue w3-left" >
            Edit shop
            </Link>
        </div>
        
  
        <Link to={`/addoffer/${shop._id}`} className="w3-button w3-block w3-dark-grey">+ Add Offer</Link>
    
      </div>
    )
  }