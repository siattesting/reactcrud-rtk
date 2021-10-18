import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOfferById } from './offersSlice'


export const OfferCard = ({ match }) => {

    const { offerId } = match.params

    const offer = useSelector(state => selectOfferById(state, offerId))
    console.log("Offer: =>", offer);
    if(!offer) return (<div><h4>No offer found</h4></div>)

    return (
      <div className="w3-card-4">
        
  
        <header className="w3-container w3-light-grey">
          <h3>{offer.title}</h3>
        </header>

        <header className="w3-container w3-light-grey">
          <h3>{offer.title}</h3>
        </header>
  
        <div className="w3-container">
        <img src="img_avatar3.png" alt="Avatar" className="w3-left w3-circle" />
          <p>{offer.price}</p>
          
          <hr />
          <p>{offer._id}</p>
          <br />
          <p>{offer.description}</p>   
          <br />
          <p>SHOP: {offer.shop}</p>   
        </div>
  
        <div className="w3-bar">
            <Link className="w3-button w3-teal w3-border w3-border-green w3-hover-green w3-right" to={'/offers'}>Back</Link>
            <Link to={`/offers/${offer._id}`} className="w3-button w3-white w3-border w3-border-green w3-left" >
            View offer
            </Link>
            <Link to={`/editoffer/${offer._id}`} className="w3-button w3-white w3-border w3-border-blue w3-left" >
            Edit offer
            </Link>
        </div>
        
  
        <button className="w3-button w3-block w3-dark-grey">+ Connect</button>
    
      </div>
    )
  }