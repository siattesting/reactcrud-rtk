import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOffers, selectAllOffers } from './offersSlice'

import { Spinner } from '../../components/Spinner'

let OfferCard = ({ offer }) => {
  return (
    <div className="w3-card-4">

      <header className="w3-container w3-light-grey">
        <h3>{offer.title}</h3>
      </header>

      <div className="w3-container">
      <img src="img_avatar3.png" alt="Avatar" className="w3-left w3-circle" />
        <p>{offer.description}</p>

        <hr />
        <p>{offer.price}</p>
        <hr />
        <p>{offer._id}</p>
      </div>

      <Link to={`/offers/${offer._id}`} className="w3-button w3-white w3-border w3-border-blue" >
        View offer
      </Link>
      <Link to={`/editoffer/${offer._id}`} className="w3-button w3-white w3-border w3-border-blue" >
        Edit offer
      </Link>

      <button className="w3-button w3-block w3-dark-grey">+ Connect</button>

    </div>
  )
}

export const OffersList = () => {

  const dispatch = useDispatch()
  const offers = useSelector(selectAllOffers)
  const offerStatus = useSelector(state => state.offers.status)
  const errorMessage = useSelector(state => state.offers.error)

  useEffect(() => {
    if (offerStatus === 'idle') {
      dispatch( fetchOffers() )
    }

  }, [offerStatus, dispatch])

  let content

  if (offerStatus === 'loading') {
    content = <Spinner text="Loading offers. Please wait..." />

  } else if (offerStatus === 'succeeded') {
    content = offers.map(offer => <OfferCard key={offer._id} offer={offer} />)

  } else if (offerStatus === 'failed') {
    content = <div>{errorMessage}</div>

  }

  return (
    <section className="w3-container">
        <section>
            <h2>Offers</h2>
            <div>
                <Link to={'/addoffer'} className="w3-button w3-white w3-border w3-border-blue">Add offer</Link>
            </div>
        </section>

        <section className="w3-container">
            {content}
        </section>
    </section>
  )
}
