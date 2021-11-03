import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { selectShopById, updateShop, fetchShops } from './shopsSlice'

export const EditShopForm = ({ match }) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const { shopId } = match.params
    const shop = useSelector(state => selectShopById(state, shopId))
    // console.log(shop)

    const [title, setTitle] = useState(shop.title)
    const [category, setCategory] = useState(shop.category)
    const [description, setDescription] = useState(shop.description)
    const [city, setCity] = useState(shop.city)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')


    const onTitleChanged = e => setTitle(e.target.value)
    const onCategoryChanged = e => setCategory(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCityChanged = e => setCity(e.target.value)

    const canSave = [title, category, description, city].every(Boolean) && addRequestStatus === 'idle';

    const onSaveShopClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(
                    updateShop({ _id: shopId, title, category, description, city })
                ).unwrap();
                setTitle('')
                setCategory('')
                setDescription('')
                setCity('')

            } catch (err) {
                console.error('Failed to save this item:',  err)
            } finally {
                setAddRequestStatus('idle')
                dispatch(fetchShops())
                history.push(`/shops/${shopId}`)
            }
        }
    };

    return (
        <section>
          <h2>Add a New Shop</h2>
          <form className="w3-container">
            <label htmlFor="title">Shop Title:</label>
            <input
              className="w3-input"
              type="text"
              id="title"
              name="title"
              placeholder="What's your shop name?"
              value={title}
              onChange={onTitleChanged}
            />
            <label htmlFor="category">Category:</label>
            <input
              className="w3-input"
              type="category"
              id="category"
              name="category"
              placeholder="What's your shops's category?"
              value={category}
              onChange={onCategoryChanged}
            />
            <label htmlFor="description">Decription:</label>
            <textarea
              className="w3-input"
              type="description"
              id="description"
              name="description"
              placeholder="Describe your shop..."
              value={description}
              onChange={onDescriptionChanged}
            />
            <label htmlFor="city">City:</label>
            <input
              className="w3-input"
              type="city"
              id="city"
              name="city"
              placeholder="Where is your shop?"
              value={city}
              onChange={onCityChanged}
            />
            <div className="w3-container">
                <div className="w3-bar">
                    <button type="button" className="w3-button w3-white w3-border w3-border-green" onClick={onSaveShopClicked} disabled={!canSave}>
                    Save Shop
                    </button>

                    <Link to={`/shops/${shop._id}`} className="w3-button w3-white w3-border w3-border-red" >
                    Cancel
                    </Link>
                </div>
            </div>
          </form>
        </section>
      );
}
