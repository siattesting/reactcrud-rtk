import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShops, selectAllShops } from './shopsSlice'

import { Spinner } from '../../components/Spinner'
// import { PostAuthor } from './PostAuthor'
// import { TimeAgo } from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'

let ShopCard = ({ shop }) => {
  return (
    <div className="w3-card-4">

      <header className="w3-container w3-light-grey">
        <h3>{shop.title}</h3>
      </header>

      <div className="w3-container">
      <img src="img_avatar3.png" alt="Avatar" className="w3-left w3-circle" />
        <p>{shop.description}</p>

        <hr />
        <p>{shop.city}</p>
        <hr />
        <p>{shop._id}</p>
      </div>

      <Link to={`/shops/${shop._id}`} className="w3-button w3-white w3-border w3-border-blue" >
        View shop
      </Link>
      <Link to={`/editshop/${shop._id}`} className="w3-button w3-white w3-border w3-border-blue" >
        Edit shop
      </Link>

      <button className="w3-button w3-block w3-dark-grey">+ Connect</button>

    </div>
  )
}

export const ShopsList = () => {

  const dispatch = useDispatch()
  const shops = useSelector(selectAllShops)
  const shopStatus = useSelector(state => state.shops.status)
  const errorMessage = useSelector(state => state.shops.error)

  useEffect(() => {
    if (shopStatus === 'idle') {
      dispatch( fetchShops() )
    }

  }, [shopStatus, dispatch])

  let content

  if (shopStatus === 'loading') {
    content = <Spinner text="Loading shops. Please wait..." />

  } else if (shopStatus === 'succeeded') {
    content = shops.map(shop => <ShopCard key={shop._id} shop={shop} />)

  } else if (shopStatus === 'failed') {
    content = <div>{errorMessage}</div>

  }

  return (
    <section className="w3-container">
        <section>
            <h2>Shops</h2>
            <div>
                <Link to={'/addshop'} className="w3-button w3-white w3-border w3-border-blue">Add shop</Link>
            </div>
        </section>

        <section className="w3-container">
            {content}
        </section>
    </section>
  )
}
